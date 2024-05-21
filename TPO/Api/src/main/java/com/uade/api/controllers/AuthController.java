package com.uade.api.controllers;

import java.util.Date;
import java.util.Optional;
import javax.crypto.SecretKey;

import com.uade.api.models.DTOs.UsuarioModelDTO;
import com.uade.api.models.UsuarioModel;
import com.uade.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final int EXPIRATION_TIME_IN_MIN = 60;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private SecretKey secretKey; // Inyecta la clave secreta

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioModelDTO credentials) throws Exception {
        // Validar las credenciales aquí (puedes usar Spring Security u otros
        // mecanismos)
        UsuarioModel usuario = this.usuarioService.findUsuario(credentials.getIdentificador(), credentials.getContrasenia());
        if (usuario == null)
            return new ResponseEntity<>("Credenciales inválidas.", HttpStatus.UNAUTHORIZED);

        // Crear el token JWT
        String token = Jwts.builder()
                .subject(usuario.getIdentificador()).issuedAt(new Date())
                .claim("rol", usuario.getTipoUsuario())
                .claim("id", usuario.getIdentificador())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                .signWith(secretKey, SignatureAlgorithm.HS256).compact();
        return new ResponseEntity<>(token, HttpStatus.OK);
        }
}
