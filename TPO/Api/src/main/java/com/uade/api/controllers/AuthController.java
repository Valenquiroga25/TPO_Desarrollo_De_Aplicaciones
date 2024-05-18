package com.uade.api.controllers;

import java.util.Date;
import java.util.Optional;
import javax.crypto.SecretKey;
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
    public ResponseEntity<String> login(@RequestBody UsuarioModel credentials){
        // Validar las credenciales aquí (puedes usar Spring Security u otros
        // mecanismos)
        Optional <UsuarioModel> usuarioOp = Optional.ofNullable(this.usuarioService.findUsuario(credentials.getIdentificador(), credentials.getContrasenia()));
        if (usuarioOp.isEmpty())
            return new ResponseEntity<>("Credenciales inválidas.", HttpStatus.UNAUTHORIZED);

        // Crear el token JWT
        String token = Jwts.builder()
                .subject(credentials.getIdentificador()).issuedAt(new Date())
                .claim("rol", credentials.getTipoUsuario())
                .claim("id", credentials.getIdentificador())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                .signWith(secretKey, SignatureAlgorithm.HS256).compact();
        return new ResponseEntity<>(token, HttpStatus.OK);
        }
}
