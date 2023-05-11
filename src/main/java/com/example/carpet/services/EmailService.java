package com.example.carpet.services;

import com.example.carpet.models.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class EmailService {
    private static final String EMAIL_SUBJECT = "Your Order Is Done";
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.application.name}")
    private String appName;

    public void sendOrderStateEmail(String email, Order order) {
        String message = appName + " informs you that your Order:" +
                "\nOrder Name: " + order.getName() +
                "\nOrder number: " + order.getId() +
                "\nTotal of: " + order.getPrice() + " ILS." +
                "\nIs Cleaned and you can come to take it.";
        String from = "akurdi202@gmail.com";
        send(email, from, message);
    }

    @Async
    private void send(String to, String from, String email) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(EMAIL_SUBJECT);
            helper.setText(email);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }
}