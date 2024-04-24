package com.uade.api.services;

import com.uade.api.models.*;
import com.uade.api.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class ReclamosService {

    @Autowired
    private ReclamosRepository reclamosRepository;
    @Autowired
    private VecinosService vecinosService;
    @Autowired
    private PersonalService personalService;
    @Autowired
    private SitiosService sitiosService;
    @Autowired
    private DesperfectosService desperfectosService;

    private ImagenService imagenService;

    public ReclamoModel createReclamo(ReclamoModel newReclamo) throws Exception{
        Optional<VecinoModel> vecinoOp = Optional.ofNullable(vecinosService.findVecinoByDocumento(newReclamo.getVecino().getDocumento()));
        if (vecinoOp.isEmpty()){
            log.error("El vecino con el documento " + newReclamo.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El vecino con el documento " + newReclamo.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
        }

        VecinoModel vecinoDb = vecinoOp.get();

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioById(newReclamo.getSitio().getIdSitio()));
        if (sitioOp.isEmpty()){
            log.error("El sitio con el id " + newReclamo.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El sitio con el id " + newReclamo.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
        }

        SitioModel sitioDb = sitioOp.get();

        Optional<DesperfectoModel> desperfectoOp = Optional.ofNullable(desperfectosService.findDesperfectoById(newReclamo.getDesperfecto().getIdDesperfecto()));
        if (desperfectoOp.isEmpty()){
            log.error("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
        }

        DesperfectoModel desperfectoDb = desperfectoOp.get();

        return reclamosRepository.save(newReclamo);
    }
}
