package com.uade.api.services;

import com.uade.api.models.SitioModel;
import com.uade.api.repositories.SitiosRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class SitiosService {

    @Autowired
    private SitiosRepository sitiosRepository;

    public SitioModel findSitioById(Long idSitio) throws Exception{
        log.info("Id ingresado " + idSitio);
        if(idSitio < 0){
            log.error("El Id ingresado no es válido. Ingrese un Id positivo!");
            throw new Exception("El Id no es válido. Ingrese un Id positivo!");
        }
        Optional<SitioModel> sitioOp = sitiosRepository.findById(idSitio);
        if (sitioOp.isEmpty()){
            log.error("El sitio con el Id " + idSitio + " no se encuentra registrado en la base de datos!");
            throw new Exception("El sitio con el Id " + idSitio + " no se encuentra registrado en la base de datos!");
        }
        return sitioOp.get();
    }
}
