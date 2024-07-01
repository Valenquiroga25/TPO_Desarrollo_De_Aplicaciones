package com.uade.api.controllers;

import com.uade.api.models.DTOs.DenunciaDevueltaDTO;
import com.uade.api.models.DTOs.DenunciaModelDTO;
import com.uade.api.models.DenunciaModel;
import com.uade.api.models.ReclamoModel;
import com.uade.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/tpo-desarrollo-mobile/denuncias")
public class DenunciasController {
    @Autowired
    private DenunciasService denunciasService;
    @Autowired
    private VecinosService vecinosService;
    @Autowired
    private SitiosService sitiosService;


    @PostMapping(path = "/")
    public ResponseEntity<?> createDenuncia(@RequestBody DenunciaModelDTO denunciaDTO){
        try {
            DenunciaModel denuncia = convertToEntity(denunciaDTO);
            return new ResponseEntity<>(denunciasService.createDenuncia(denuncia), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateDenuncia(@PathVariable Long id, @RequestBody DenunciaModelDTO denunciaDTO){
        try {
            return new ResponseEntity<>(denunciasService.updateDenuncia(id,denunciaDTO.getDescripcion(),denunciaDTO.getCalleSitio(),denunciaDTO.getNumeroSitio()),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @GetMapping(path ="/{id}")
    public ResponseEntity<?> getDenunciaById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(denunciasService.findDenunciaById(id),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDenuncia(@PathVariable Long id){
        try{
            return new ResponseEntity<>(denunciasService.deleteServicio(id),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path ="/allDenunciasFromVecino/{documento}")
    public ResponseEntity<?> getAllDenuncias(@PathVariable String documento){
        try{
            List<DenunciaModel> denunciasFromVecino = denunciasService.findAllDenunciasFromVecino(documento);
            List<DenunciaDevueltaDTO> denunciasFromVecinoDTO = new ArrayList<>();
            for (DenunciaModel denuncia : denunciasFromVecino) {
                denunciasFromVecinoDTO.add(converToDTO(denuncia));
            }
            return new ResponseEntity<>(denunciasFromVecinoDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    public DenunciaModel convertToEntity(DenunciaModelDTO denunciaDTO)throws Exception{
        return new DenunciaModel(
                this.vecinosService.findVecinoByDocumento(denunciaDTO.getDocumentoVecino()),
                sitiosService.findSitioByDireccion(denunciaDTO.getCalleSitio(), denunciaDTO.getNumeroSitio()),
                denunciaDTO.getDescripcion(),
                denunciaDTO.getAceptaResponsabilidad());
    }

    private DenunciaDevueltaDTO converToDTO(DenunciaModel denuncia) {
        DenunciaDevueltaDTO denunciaDevuelta = new DenunciaDevueltaDTO(
                denuncia.getIdDenuncia(),
                denuncia.getVecino().getDocumento(),
                denuncia.getSitio().getCalle(),
                denuncia.getSitio().getNumero(),
                denuncia.getDescripcion(),
                denuncia.getEstado());
        return denunciaDevuelta;
    }
}