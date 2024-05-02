package com.uade.api.services;

import com.uade.api.models.DesperfectoModel;
import com.uade.api.repositories.DesperfectosRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class DesperfectosService {

    @Autowired
    private DesperfectosRepository desperfectosRepository;

    public DesperfectoModel findDesperfectoById(Long idDesperfecto) throws Exception{
        log.info("Id ingresado " + idDesperfecto);
        if(idDesperfecto < 0){
            log.error("El Id ingresado no es válido. Ingrese un Id positivo!");
            throw new Exception("El Id no es válido. Ingrese un Id positivo!");
        }
        Optional<DesperfectoModel> desperfectoOp = desperfectosRepository.findById(idDesperfecto);
        if (desperfectoOp.isEmpty()){
            log.error("El desperfecto con el Id " + idDesperfecto + " no se encuentra registrado en la base de datos!");
            throw new Exception("El desperfecto con el Id " + idDesperfecto + " no se encuentra registrado en la base de datos!");
        }
        return desperfectoOp.get();
    }
}
