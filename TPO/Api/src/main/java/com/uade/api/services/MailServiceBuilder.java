package com.uade.api.services;

import org.springframework.mail.javamail.JavaMailSender;

public class MailServiceBuilder {
    private JavaMailSender mailSender;

    public MailServiceBuilder setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
        return this;
    }

    public MailService createMailService() {
        return new MailService(mailSender);
    }
}