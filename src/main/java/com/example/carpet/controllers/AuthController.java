package com.example.carpet.controllers;

import com.example.carpet.exception.TokenRefreshException;
import com.example.carpet.models.RefreshToken;
import com.example.carpet.models.Role;
import com.example.carpet.models.RoleEnum;
import com.example.carpet.models.User;
import com.example.carpet.payloads.request.LoginReq;
import com.example.carpet.payloads.request.SignupReq;
import com.example.carpet.payloads.request.TokenRefreshReq;
import com.example.carpet.payloads.response.TokenRefreshRes;
import com.example.carpet.payloads.response.UserInfoRes;
import com.example.carpet.repository.RoleRepo;
import com.example.carpet.repository.UserRepo;
import com.example.carpet.security.jwt.JwtUtils;
import com.example.carpet.services.RefreshTokenService;
import com.example.carpet.services.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:9090","http://localhost:3000"},maxAge=3600)
public class AuthController {
    private static final String ROLE_NOT_FOUND = "Error: Role is not found.";
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;

    @Operation(summary = "Sign In")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sign in successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserInfoRes.class))}),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/signin")
    public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginReq loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new UserInfoRes(jwt, refreshToken.getToken(), userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @Operation(summary = "Refresh JWT By the refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done",
                    content = @Content(schema = @Schema(implementation = TokenRefreshRes.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Refresh token is not in database!",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/refreshtoken")
    public ResponseEntity<TokenRefreshRes> refreshtoken(@Valid @RequestBody TokenRefreshReq request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshRes(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @Operation(summary = "Sign Out")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Signed Out successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/signout")
    public ResponseEntity<Object> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok("Signed Out successful!");
    }
}