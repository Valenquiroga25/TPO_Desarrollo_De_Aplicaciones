package com.uade.api;

import com.uade.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ApiApplication {
	@Autowired
	UsuarioService usuarioService;

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ApiApplication.class,args);
	}
}
