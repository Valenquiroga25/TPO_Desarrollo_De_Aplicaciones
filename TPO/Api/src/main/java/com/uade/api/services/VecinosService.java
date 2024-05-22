package com.uade.api.services;

import com.uade.api.models.UsuarioModel;
import com.uade.api.models.VecinoModel;
import com.uade.api.repositories.VecinosRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class VecinosService {
    @Autowired
    private VecinosRepository vecinosRepository;

    public VecinoModel findVecinoByDocumento(String documento) throws Exception{
        Long documentoLong = Long.parseLong(documento);
        log.info("Documento ingresado " + documentoLong);
        if(documentoLong < 0){
            log.error("El documento ingresado no es válido. Ingrese un documento positivo!");
            throw new Exception("El documento no es válido. Ingrese un documento positivo!");
        }

        Optional<VecinoModel> vecinoOp = vecinosRepository.findVecinoByDocumento(documento);
        if(vecinoOp.isEmpty())
            log.error("El personal con el documento " + documento + " no se encuentra registrado en la base de datos!");
        return vecinoOp.orElse(null);
    }
}
