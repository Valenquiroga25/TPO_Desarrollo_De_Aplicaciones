package com.uade.api.services;

import com.uade.api.models.*;
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
    VecinosService vecinosService;
    @Autowired
    PersonalService personalService;
    @Autowired
    MailService mailService;

    public UsuarioModel createUsuario (UsuarioModel usuario) throws Exception{
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(usuario.getIdentificador());
        if(usuarioOp.isPresent()){
            throw new Exception("Este usuario ya esta creado");
        }

        Optional<VecinoModel> vecinoOp = Optional.ofNullable(this.vecinosService.findVecinoByDocumento(usuario.getIdentificador()));
        if(vecinoOp.isEmpty()) {
            throw new Exception("No existe ningún vecino con ese documento. Operación inválida!");
        }else
            usuario.setTipoUsuario("Vecino");


        String claveDeAcceso = RandomStringUtils.randomAlphanumeric(5);
        usuario.setClave_acceso(claveDeAcceso.toUpperCase());
        mailService.sendMail(usuario.getMail(), "Bienvenido a la Aplicación. ","Su código de acceso es: " + usuario.getClave_acceso());
        return this.usuarioRepository.save(usuario);
    }

    public UsuarioModel updateUsuario(String identificador, UsuarioModel usuario) throws Exception {
        log.info("Id ingresado: " + identificador);
        if (Long.parseLong(identificador) <= 0){
            log.error("El identificador ingresado no es valido.");
            throw new Exception("El identificador ingresado no es valido");
        }

        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(usuario.getIdentificador());

        if (usuarioOp.isEmpty()) {
            log.error("El usuario que intenta actualizar no se encuentra en la base de datos");
            throw new Exception("El usuario que intenta actualizar no se encuentra en la base de datos");
        }

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = bCryptPasswordEncoder.encode(usuario.getContrasenia()); // Se hashea la contraseña.
        usuario.setContrasenia(encodedPassword);

        UsuarioModel usuarioDb = usuarioOp.get();
        usuarioDb.setIdentificador(usuarioDb.getIdentificador());
        usuarioDb.setContrasenia(usuarioDb.getContrasenia());
        usuarioDb.setMail(usuarioDb.getMail());
        usuarioDb.setTipoUsuario(usuarioDb.getTipoUsuario());

        log.info("El usuario actualizado: " + usuarioDb);
        return this.usuarioRepository.save(usuarioDb);
    }

    public UsuarioModel findUsuario(String identificador, String contrasenia) throws Exception{
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(identificador);
        if(usuarioOp.isEmpty())
            throw new Exception("El usuario no se encuentra registrado en la base de datos!");

        UsuarioModel usuarioDb = usuarioOp.get();

        if(checkPasswordExists(identificador)){
            if(checkPassword(contrasenia,usuarioDb.getContrasenia())){
                return usuarioDb;
            }
        }else{
            if(usuarioDb.getClave_acceso().equals(contrasenia))
                return usuarioDb;
        }
        return null;
    }

    public UsuarioModel findUsuarioByIdentificador(String identificador) throws Exception {
        log.info("Identificador ingresado: " + identificador);
        if (Long.parseLong(identificador) <= 0){
            log.error("El identificador ingresado no es valido.");
            throw new Exception("El identificador ingresado no es valido");
        }else{
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(identificador);
        if (usuarioOp.isEmpty())
            throw new Exception("El usuario no se encuentra regisytrado en la base de datos!");
        return usuarioOp.get();
        }
    }

    public void generatePassword(String identificador, String contrasenia) throws Exception {
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(identificador);
        if(usuarioOp.isEmpty()){
            throw new Exception("El usuario no se encuentra registrado en la base de datos!");
        }

        UsuarioModel usuarioDb = usuarioOp.get();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = bCryptPasswordEncoder.encode(contrasenia); // Se hashea la contraseña.
        usuarioDb.setContrasenia(encodedPassword);

        this.usuarioRepository.save(usuarioDb);
    }

    public boolean checkPasswordExists(String identificador){
        Optional<UsuarioModel> usuarioOp = this.usuarioRepository.findUsuarioByIdentificador(identificador);
        UsuarioModel usuarioDb = usuarioOp.get();
        return usuarioDb.getContrasenia() != null;
    }

    private boolean checkPassword(String password, String passwordDB) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("Password: " + password);
        System.out.println("passwordDB: " + passwordDB);
        return passwordEncoder.matches(password, passwordDB); // COMPARA HASH DE LA CONTRASEÑA PUESTA CON HASH DE LS BD.
    }
}
