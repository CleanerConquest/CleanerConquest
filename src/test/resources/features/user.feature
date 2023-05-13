Feature: user

  Scenario: admin sign in with right credentials
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]

  Scenario: admin sign in with wrong credentials
    Given 'amer'|'test12'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]

  Scenario: admin sign out after sign in
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client calls "/api/auth/signout"
    Then the client receives status code of [200]

  Scenario: sign up admin with taken username
    Given request body
      | username | password | email               |
      | String   | String   | String              |
      | amr      | test123  | akurdi202@gmail.com |
    When the client calls "/api/auth/signup"
    Then the client receives status code of [400]


  Scenario: admin refresh the jwt
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When refreshToken
    Then the client receives status code of [200]

  Scenario: refresh the jwt with empty or wrong refresh token
    When refreshToken
    Then the client receives status code of [403]
