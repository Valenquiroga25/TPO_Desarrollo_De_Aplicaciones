package com.uade.api.controllers;

import com.uade.api.models.DTOs.UsuarioModelDTO;
import com.uade.api.models.UsuarioModel;
import com.uade.api.services.UsuarioService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path ="/tpo_desarrollo_mobile/registrar")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createUsuario(@RequestBody UsuarioModelDTO usuarioDTO){
        try {
            UsuarioModel newUsuario = convertToEntity(usuarioDTO);
            return new ResponseEntity<>(this.usuarioService.createUsuario(newUsuario), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    private UsuarioModel convertToEntity(UsuarioModelDTO usuarioModelDTO){
        UsuarioModel usuarioModel = new UsuarioModel(usuarioModelDTO.getIdentificador(),
                null,
                usuarioModelDTO.getMail(),
                usuarioModelDTO.getTipoUsuario());
        return usuarioModel;
    }
}
