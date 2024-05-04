package com.uade.api.controllers;

import com.uade.api.models.DTOs.DenunciaModelDTO;
import com.uade.api.models.DenunciaModel;
import com.uade.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "vecinos/denuncias")
public class DenunciasController {
    @Autowired
    private DenunciasService denunciasService;
    @Autowired
    private VecinosService vecinosService;
    @Autowired
    private SitiosService sitiosService;


    @PostMapping(path = "/denuncia-generar")
    public ResponseEntity<?> createDenuncia(@RequestBody DenunciaModelDTO denunciaDTO){
        try {
            DenunciaModel denuncia = convertToEntity(denunciaDTO);
            return new ResponseEntity<>(denunciasService.createDenuncia(denuncia), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @PutMapping(path = "/denuncia-editar/{id}")
    public ResponseEntity<?> updateDenuncia(@PathVariable Long id, @RequestBody DenunciaModelDTO denunciaDTO){
        try {
            return new ResponseEntity<>(denunciasService.updateDenuncia(id,denunciaDTO.getDescripcion()),HttpStatus.OK);
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

    @DeleteMapping("/denuncia-eliminar/{id}")
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
            return new ResponseEntity<>(this.denunciasService.findAllDenunciasFromVecino(documento),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    public DenunciaModel convertToEntity(DenunciaModelDTO denunciaDTO)throws Exception{
        return new DenunciaModel(
                this.vecinosService.findVecinoByDocumento(denunciaDTO.getIdVecino()),
                this.sitiosService.findSitioById(denunciaDTO.getIdSitio()),
                denunciaDTO.getDescripcion(),
                denunciaDTO.getEstado(),
                denunciaDTO.getAceptaResponsabilidad());
    }
}