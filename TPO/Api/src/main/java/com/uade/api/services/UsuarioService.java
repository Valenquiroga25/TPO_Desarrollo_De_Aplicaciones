package com.uade.api.services;

import com.uade.api.models.DTOs.UsuarioModelDTO;
import com.uade.api.models.UsuarioModel;
import com.uade.api.repositories.IUsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    IUsuarioRepository usuarioRepository;
    @Autowired
    MailService mailService;
    public UsuarioModel createUsuario (UsuarioModel usuario)throws Exception{
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(usuario.getIdentificador());
        if(usuarioOp.isPresent()){
            throw new Exception("Este usuario ya esta creado");
        }

        String claveDeAcceso = RandomStringUtils.randomAlphanumeric(5);
        usuario.setClave_acceso(claveDeAcceso);
        mailService.sendMail(usuario.getMail(), "Bienvenido a la Aplicación. ","Su código de acceso es: " + usuario.getClave_acceso());
        return this.usuarioRepository.save(usuario);
    }

    public UsuarioModel findUsuario(String identificador, String contrasenia) throws Exception{
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(identificador);
        if(usuarioOp.isEmpty())
            throw new Exception("El usuario no se encuentra registrado en la base de datos!");

        UsuarioModel usuarioDb = usuarioOp.get();
        if(checkPassword(contrasenia,usuarioDb.getContrasenia())){
            return usuarioDb;
        }

        return null;
    }

    private boolean checkPassword(String password, String passwordDB) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("Password: " + password);
        System.out.println("passwordDB: " + passwordDB);
        boolean passwordMatches = passwordEncoder.matches(password, passwordDB);
        return passwordMatches;
    }
}
