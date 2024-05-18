package com.uade.api;

import com.uade.api.services.MailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ApiApplication {
	//private MailService mailService;

	/*
	public ApiApplication(MailService mailService) {
			this.mailService = mailService;
	}
	*/

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ApiApplication.class,args);
		//ApiApplication app = context.getBean(ApiApplication.class);
		//app.testMail();
	}
	/*
	private void testMail(){
		mailService.sendMail("rosellomateo@gmail.com","prueba","VAMO VIEJO");
	}
	 */
}
