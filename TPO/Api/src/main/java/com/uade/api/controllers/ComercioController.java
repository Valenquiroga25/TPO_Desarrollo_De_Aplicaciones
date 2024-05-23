package com.uade.api.controllers;

import com.uade.api.models.ComercioModel;
import com.uade.api.models.DTOs.ComercioModelDTO;
import com.uade.api.services.ComerciosService;
import com.uade.api.services.VecinosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/tpo-desarrollo-mobile/comercios")
public class ComercioController {
    @Autowired
    ComerciosService comerciosService;
    @Autowired
    VecinosService vecinosService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createComercio(@RequestBody ComercioModelDTO comercioDTO){
        try{
            ComercioModel comercio = convertToEntity(comercioDTO);
            return new ResponseEntity<>(this.comerciosService.createComercio(comercio), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateComercio(@PathVariable Long idComercio, @RequestBody ComercioModelDTO comercioDTO){
        try{
            ComercioModel comercio = convertToEntity(comercioDTO);
            return new ResponseEntity<>(this.comerciosService.updateComercio(idComercio, comercio.getDescripcion()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long idComercio){
        try{
            return new ResponseEntity<>(this.comerciosService.deleteComercio(idComercio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findServicioById(@PathVariable Long idComercio){
        try{
            return new ResponseEntity<>(this.comerciosService.findComercioById(idComercio),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ComercioModel convertToEntity(ComercioModelDTO comercioDTO) throws Exception {
        ComercioModel comercio = new ComercioModel(this.vecinosService.findVecinoByDocumento(comercioDTO.getVecino().getDocumento()),
                comercioDTO.getDireccion(),
                comercioDTO.getTelefono(),
                comercioDTO.getDescripcion(),
                comercioDTO.getImagenes());
        return comercio;
    }
}
