package com.uade.api.controllers;

import com.uade.api.models.DTOs.ServicioModelDTO;
import com.uade.api.models.ServicioModel;
import com.uade.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/tpo-desarrollo-mobile/servicios")
public class ServicioController {
    @Autowired
    ServicioService servicioService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    RubrosService rubrosService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createServicio(@RequestBody ServicioModelDTO servicioDTO){
        try{
            ServicioModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioService.createServicio(servicio), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{idServicio}")
    public ResponseEntity<?> updateServicio(@PathVariable Long idServicio, @RequestBody ServicioModelDTO servicioDTO){
        try{
            ServicioModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioService.updateServicio(idServicio,servicio.getDescripcion()),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(path = "/{idServicio}")
    public ResponseEntity<?> deleteService(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioService.deleteServicio(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{idServicio}")
    public ResponseEntity<?> findServicioById(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioService.findServicioById(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAllServicios")
    public ResponseEntity<?> getAllServicios(){
        try{
            return new ResponseEntity<>(this.servicioService.getAllServicios(),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAllComercios")
    public ResponseEntity<?>getAllComercios(){
        try{
            return new ResponseEntity<>(this.servicioService.getComercios(),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    @GetMapping("/getAllProfesionales")
    public ResponseEntity<?>getAllProfesionales(){
        try{
            return new ResponseEntity<>(this.servicioService.getProfesionales(),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }


    private ServicioModel convertToEntity(ServicioModelDTO servicioDTO) throws Exception {
        ServicioModel servicio = new ServicioModel(this.vecinosService.findVecinoByDocumento(servicioDTO.getDocumentoVecino()),
                servicioDTO.getTitulo(),
                servicioDTO.getDireccion(),
                servicioDTO.getTelefono(),
                servicioDTO.getDescripcion(),
                this.rubrosService.findRubroById(servicioDTO.getIdRubro()),
                null,
                servicioDTO.getTipoServicio());
        return servicio;
    }
}
