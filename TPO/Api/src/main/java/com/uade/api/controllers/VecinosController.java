package com.uade.api.controllers;

import com.uade.api.services.VecinosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path ="/tpo_desarrollo_mobile/vecinos")
public class VecinosController {
    @Autowired
    private VecinosService vecinosService;

    @GetMapping(path = "/{documento}")
    public ResponseEntity<?> getVecinoByDocumento(@PathVariable String documento){
        try {
            return new ResponseEntity<>(vecinosService.findVecinoByDocumento(documento), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
}
