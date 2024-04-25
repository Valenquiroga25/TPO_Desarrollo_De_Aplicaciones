package com.uade.api.services;

import com.uade.api.models.DenunciaModel;
import com.uade.api.models.SitioModel;
import com.uade.api.models.VecinoModel;
import com.uade.api.repositories.DenunciasRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class DenunciasService {
    @Autowired
    private DenunciasRepository denunciasRepository;
    @Autowired
    private VecinosService vecinosService;
    @Autowired
    private SitiosService sitiosService;

    public DenunciaModel createDenuncia(DenunciaModel newDenuncia)throws Exception {
        Optional<VecinoModel> vecinoOp = Optional.ofNullable(vecinosService.findVecinoByDocumento(newDenuncia.getVecino().getDocumento()));

        if (vecinoOp.isEmpty()){
            log.error("El vecino con el documento " + newDenuncia.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El vecino con el documento " + newDenuncia.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
        }

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioById(newDenuncia.getSitio().getIdSitio()));

        if (sitioOp.isEmpty()){
            log.error("El sitio con el id " + newDenuncia.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El sitio con el id " + newDenuncia.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
        }

        return this.denunciasRepository.save(newDenuncia);
    }

    public DenunciaModel findDenunciaById(int idDenuncia) throws Exception {
        log.info("id ingresado: " + idDenuncia);
        Optional<DenunciaModel> denunciaOp = denunciasRepository.findDenunciaById(idDenuncia);

        if (denunciaOp.isEmpty()) {
            log.error("Denuncia no encontrada");
            throw new Exception("Denuncia no encontrada");
        }

        return denunciaOp.get();
    }
}