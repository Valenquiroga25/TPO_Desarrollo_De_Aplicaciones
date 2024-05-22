package com.uade.api.controllers;

import com.uade.api.models.UsuarioModel;
import com.uade.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path ="/tpo-desarrollo-mobile/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(path = "/signUp")
    public ResponseEntity<?> createUsuario(@RequestBody UsuarioModel usuario){
        try {
            return new ResponseEntity<>(this.usuarioService.createUsuario(usuario), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateUsuario(@RequestBody UsuarioModel usuario, @PathVariable String identificador) {
        try {
            return new ResponseEntity<>(usuarioService.updateUsuario(usuario, identificador), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path ="/{id}")
    public ResponseEntity<?> getUsuarioByIdentificador(@PathVariable String identificador) {
        try {
            UsuarioModel user = usuarioService.findUsuarioByIdentificador(identificador);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
}
