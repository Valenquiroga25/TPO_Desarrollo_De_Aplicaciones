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

    public SitioModel findSitioByDireccion(String calleSitio, Long numeroSitio) throws Exception{
        log.info("Dirección ingresada: " + calleSitio + " " + numeroSitio);

        Optional<SitioModel> sitioOp = this.sitiosRepository.findByCalleAndNumero(calleSitio, numeroSitio);
        if (sitioOp.isEmpty()){
            log.error("No hay ningún sitio en la dirección " + calleSitio + " " + numeroSitio);
            throw new Exception("No hay ningún sitio en la dirección " + calleSitio + " " + numeroSitio);
        }
        return sitioOp.get();
    }
}
