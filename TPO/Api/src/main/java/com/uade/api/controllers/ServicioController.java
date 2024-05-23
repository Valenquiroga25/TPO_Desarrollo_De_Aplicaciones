package com.uade.api.controllers;

import com.uade.api.models.DTOs.ServicioModelDTO;
import com.uade.api.models.ServicioModel;
import com.uade.api.services.RubrosService;
import com.uade.api.services.ServicioService;
import com.uade.api.services.VecinosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/tpo-desarrollo-mobile/servicios")
public class ServicioController {
    @Autowired
    ServicioService servicioService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    RubrosService rubrosService;

    public ResponseEntity<?> createServicio(ServicioModelDTO servicioDTO){
        try{
            ServicioModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioService.createServicio(servicio), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<?> updateServicio(@PathVariable Long idServicio, @RequestBody ServicioModelDTO servicioDTO){
        try{
            ServicioModel servicio = convertToEntity(servicioDTO);
            return new ResponseEntity<>(this.servicioService.updateServicio(servicio.getIdServicio(),servicio.getDescripcion()),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<?> deleteService(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioService.deleteServicio(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<?> findServicioById(@PathVariable Long idServicio){
        try{
            return new ResponseEntity<>(this.servicioService.findServicioById(idServicio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ServicioModel convertToEntity(ServicioModelDTO servicioDTO) throws Exception {
        ServicioModel servicio = new ServicioModel(this.vecinosService.findVecinoByDocumento(servicioDTO.getVecino().getDocumento()),
                servicioDTO.getDireccion(),
                servicioDTO.getTelefono(),
                this.rubrosService.findRubroById(servicioDTO.getRubro().getIdRubro()),
                servicioDTO.getDescripcion(),
                servicioDTO.getImagenes());
        return servicio;
    }
}
