package com.uade.api.services;

import com.uade.api.models.RubroModel;
import com.uade.api.repositories.RubrosRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class RubrosService {
    @Autowired
    RubrosRepository rubrosRepository;

    public RubroModel findRubroById(Long id) throws Exception{
        log.info("Id ingresado " + id);
        if(id < 0){
            log.error("El Id ingresado no es válido. Ingrese un Id positivo!");
            throw new Exception("El Id no es válido. Ingrese un Id positivo!");
        }
        Optional<RubroModel> rubroOp = rubrosRepository.findById(id);
        if(rubroOp.isEmpty()){
            log.error("El rubro indicado no se encuentra en la base de datos!");
            throw new Exception("El rubro indicado no se encuentra en la base de datos!");
        }

        return rubroOp.get();
    }
}
