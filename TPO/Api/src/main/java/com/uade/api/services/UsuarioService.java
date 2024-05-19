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
    public UsuarioModel createUsuario (UsuarioModelDTO usuarioModelDTO)throws Exception{
        UsuarioModel newUsuario = convertToEntity(usuarioModelDTO);
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(newUsuario.getIdentificador());
        if(usuarioOp.isPresent()){
            throw new Exception("Este usuario ya esta creado");
        }
        mailService.sendMail(newUsuario.getMail(), "Bienvenido a la Aplicación","Su codigo de acceso es: "+ newUsuario.getClave_acceso());
        return this.usuarioRepository.save(newUsuario);
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
    private UsuarioModel convertToEntity(UsuarioModelDTO usuarioModelDTO){
        String claveDeAcceso = RandomStringUtils.randomAlphanumeric(5);
        UsuarioModel usuarioModel = new UsuarioModel(usuarioModelDTO.getIdentificador(),
                null,
                usuarioModelDTO.getMail(),
                claveDeAcceso,
                usuarioModelDTO.getTipoUsuario());
        return usuarioModel;
    }
}
