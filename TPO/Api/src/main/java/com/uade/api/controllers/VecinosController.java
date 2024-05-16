package com.uade.api.controllers;

import com.uade.api.services.VecinosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VecinosController {
    @Autowired
    private VecinosService vecinosService;
    public ResponseEntity<?> getVecinoByDocumento(@PathVariable String dni){
        try {
            return new ResponseEntity<>(vecinosService.findVecinoByDocumento(dni), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
}
