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
        log.info("Id ingresado " + documentoLong);
        if(documentoLong < 0){
            log.error("El Id ingresado no es válido. Ingrese un Id positivo!");
            throw new Exception("El Id no es válido. Ingrese un Id positivo!");
        }
        Optional<VecinoModel> vecinoOp = vecinosRepository.findById(documentoLong);
        if (vecinoOp.isEmpty()){
            log.error("El vecino con el Id " + documentoLong + " no se encuentra registrado en la base de datos!");
            throw new Exception("El vecino con el Id " + documentoLong + " no se encuentra registrado en la base de datos!");
        }
        return vecinoOp.get();
    }
}
