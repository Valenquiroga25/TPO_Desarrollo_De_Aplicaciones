package com.uade.api.services;

import com.uade.api.models.UsuarioModel;
import com.uade.api.models.VecinoModel;
import com.uade.api.repositories.IUsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    IUsuarioRepository usuarioRepository;

    public UsuarioModel findUsuario(String identificador, String contrasenia) throws Exception {
        Optional<VecinoModel> vecinoOp = Optional.ofNullable(this.findUsuario(identificador));
        if(vecinoOp.isPresent() && checkPassword(contrasenia,vecinoOp.get().getUsuario().getContrasenia())){
            return vecinoOp.get().getUsuario();
        }
        return null;
    }

    private boolean checkPassword(String password, String passwordDB) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("Password: " + password);
        System.out.println("passwordDB: " + passwordDB);
        boolean passwordMatches = passwordEncoder.matches(password, passwordDB);

        return passwordMatches;
    }}
