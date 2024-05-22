package com.uade.api.controllers;

import com.uade.api.models.DTOs.ReclamoModelDTO;
import com.uade.api.models.*;
import com.uade.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin() // Para que un controlador externo (un front alojado en otro dominio) acceda a nuestro sistema.
@RestController
@RequestMapping(path ="/tpo-desarrollo-mobile/reclamos")
public class ReclamosController {

    @Autowired
    ReclamosService reclamosService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    PersonalService personalService;
    @Autowired
    SitiosService sitiosService;
    @Autowired
    DesperfectosService desperfectosService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createReclamo(@RequestBody ReclamoModelDTO reclamoDTO){ // RequestBody -> Se utiliza para vincular el cuerpo de un objeto con el dato que se pasa como parámetro (para actualizar o crear un objeto).
        try{
            ReclamoModel reclamo = convertToEntity(reclamoDTO);
            return new ResponseEntity<>(reclamosService.createReclamo(reclamo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateReclamo(@PathVariable Long id,@RequestBody ReclamoModelDTO reclamoDTO){
        try{
            return new ResponseEntity<>(this.reclamosService.updateReclamo(id,reclamoDTO.getIdDesperfecto(), reclamoDTO.getDescripcion(), reclamoDTO.getImagenes()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<?> deleteReclamo(@PathVariable Long id){ // PathVariable -> Se utiliza para encontrar el objeto en la BD que tiene el ID que se manda.
        try{
            return new ResponseEntity<>(this.reclamosService.deleteReclamo(id),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getReclamoById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(this.reclamosService.findReclamoById(id),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "/allFromVecino/{documento}")
    public ResponseEntity<?> getAllReclamosByDocumento(@PathVariable String documento){
        try{
            return new ResponseEntity<>(reclamosService.findAllReclamosFromVecino(documento),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "allFromPersonal/{legajo}")
    public ResponseEntity<?> getAllReclamosByLegajo(@PathVariable String legajo){
        try{
            return new ResponseEntity<>(reclamosService.findAllReclamosFromPersonal(legajo),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ReclamoModel convertToEntity(ReclamoModelDTO reclamoDTO) throws Exception{
        if(reclamoDTO.getDocumentoVecino() != null && reclamoDTO.getLegajoPersonal() != null)
            throw new Exception("El reclamo no puede ser de un vecino y un inspector a la vez!");

        else if(reclamoDTO.getDocumentoVecino() != null){
            ReclamoModel reclamo = new ReclamoModel(
                    vecinosService.findVecinoByDocumento(reclamoDTO.getDocumentoVecino()),
                    sitiosService.findSitioById(reclamoDTO.getIdSitio()),
                    desperfectosService.findDesperfectoById(reclamoDTO.getIdDesperfecto()),
                    reclamoDTO.getDescripcion(),
                    reclamoDTO.getImagenes(),
                    reclamoDTO.getIdReclamoUnificado()
            );
            return reclamo;

        } else{
            ReclamoModel reclamo = new ReclamoModel(
                    personalService.findPersonalByLegajo(reclamoDTO.getLegajoPersonal()),
                    sitiosService.findSitioById(reclamoDTO.getIdSitio()),
                    desperfectosService.findDesperfectoById(reclamoDTO.getIdDesperfecto()),
                    reclamoDTO.getDescripcion(),
                    reclamoDTO.getImagenes(),
                    reclamoDTO.getIdReclamoUnificado()
            );
            return reclamo;
        }
    }

    public ReclamoModelDTO convertToDTO(ReclamoModel reclamo){
        if(reclamo.getPersonal() != null){
            ReclamoModelDTO reclamoDTO =  new ReclamoModelDTO(reclamo.getPersonal(),
                    reclamo.getSitio(),
                    reclamo.getDesperfecto(),
                    reclamo.getDescripcion(),
                    reclamo.getImagenes(),
                    reclamo.getIdReclamoUnificado());
            return reclamoDTO;

        }else{
            ReclamoModelDTO reclamoDTO = new ReclamoModelDTO (reclamo.getVecino(),
                    reclamo.getSitio(),
                    reclamo.getDesperfecto(),
                    reclamo.getDescripcion(),
                    reclamo.getImagenes(),
                    reclamo.getIdReclamoUnificado());
            return reclamoDTO;
        }
    }
}
