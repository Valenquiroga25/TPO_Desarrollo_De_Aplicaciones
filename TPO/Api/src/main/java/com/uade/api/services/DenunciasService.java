package com.uade.api.services;

import com.uade.api.models.*;
import com.uade.api.repositories.DenunciasRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioByDireccion(newDenuncia.getSitio().getCalle(), newDenuncia.getSitio().getNumero()));
        if (sitioOp.isEmpty()){
            log.error("No hay ningún sitio en la dirección " + newDenuncia.getSitio().getCalle() + " " + newDenuncia.getSitio().getNumero());
            throw new Exception("No hay ningún sitio en la dirección " + newDenuncia.getSitio().getCalle() + " " + newDenuncia.getSitio().getNumero());
        }

        return this.denunciasRepository.save(newDenuncia);
    }

    public DenunciaModel updateDenuncia(Long id, String descripcion) throws Exception{
        if(id < 0){
            log.error("El Id no es válido. El Id debe ser positivo!");
            throw new Exception("El Id no es válido. El Id debe ser positivo!");
        }

        Optional<DenunciaModel> denunciaOp = denunciasRepository.findById(id);

        if(denunciaOp.isEmpty()){
            log.error("La denuncia con el Id " + id + " no se encuentra registrada en la base de datos.");
            throw new Exception("La denuncia con el Id " + id + " no se encuentra registrada en la base de datos.");
        }

        DenunciaModel denunciaDb = denunciaOp.get();
        denunciaDb.setDescripcion(descripcion);

        log.info("Descripción actualizada de la denuncia " + denunciaDb.getIdDenuncia());
        return this.denunciasRepository.save(denunciaDb);
    }

    public String deleteServicio(Long id) throws Exception{
        Optional<DenunciaModel> denunciaOp = this.denunciasRepository.findById(id);

        if(denunciaOp.isEmpty()){
            log.error("La denuncia con el Id " + id + " no se encuentra registrada en la base de datos.");
            throw new Exception("La denuncia con el Id " + id + " no se encuentra registrada en la base de datos.");
        }

        DenunciaModel denunciaDb = denunciaOp.get();
        this.denunciasRepository.delete(denunciaDb);

        return "Denuncia eliminada con éxito!";
    }

    public DenunciaModel findDenunciaById(Long idDenuncia) throws Exception {
        log.info("id ingresado: " + idDenuncia);
        Optional<DenunciaModel> denunciaOp = denunciasRepository.findById(idDenuncia);

        if (denunciaOp.isEmpty()) {
            log.error("Denuncia no encontrada");
            throw new Exception("Denuncia no encontrada");
        }

        return denunciaOp.get();
    }
    public List<DenunciaModel> findAllDenunciasFromVecino(String documento){
        List<DenunciaModel> allDenuncias = this.denunciasRepository.findAll();
        List<DenunciaModel> allDenunciasFromVecinos = new ArrayList<>();

        for(DenunciaModel denuncia : allDenuncias){
            if (Objects.equals(denuncia.getVecino().getDocumento(), documento))
                allDenunciasFromVecinos.add(denuncia);
        }
        return allDenunciasFromVecinos;
    }
}