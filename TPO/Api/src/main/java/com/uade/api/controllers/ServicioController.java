package com.uade.api.controllers;

import com.uade.api.models.DTOs.ServicioModelDTO;
import com.uade.api.models.ServicioProfesionalModel;
import com.uade.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/tpo-desarrollo-mobile/servicios")
public class ServicioController {
    @Autowired
    ServicioProfesionalService servicioPrfesionalService;
    @Autowired
    ComerciosService comercioService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    RubrosService rubrosService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createServicio(@RequestBody ServicioModelDTO servicioDTO){
        try{
            ServicioProfesionalModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioPrfesionalService.createServicio(servicio), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateServicio(@PathVariable Long idServicio, @RequestBody ServicioModelDTO servicioDTO){
        try{
            ServicioProfesionalModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioPrfesionalService.updateServicio(idServicio,servicio.getDescripcion()),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioPrfesionalService.deleteServicio(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findServicioById(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioPrfesionalService.findServicioById(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAllServicios")
    public ResponseEntity<?> getAllServicios(){
        try{
            return new ResponseEntity<>(this.servicioPrfesionalService.getAllServicios(),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ServicioProfesionalModel convertToEntity(ServicioModelDTO servicioDTO) throws Exception {
        ServicioProfesionalModel servicio = new ServicioProfesionalModel(this.vecinosService.findVecinoByDocumento(servicioDTO.getVecino().getDocumento()),
                servicioDTO.getDireccion(),
                servicioDTO.getTelefono(),
                servicioDTO.getDescripcion(),
                servicioDTO.getImagenes(),
                this.rubrosService.findRubroById(servicioDTO.getRubro().getIdRubro()));
        return servicio;
    }
}
