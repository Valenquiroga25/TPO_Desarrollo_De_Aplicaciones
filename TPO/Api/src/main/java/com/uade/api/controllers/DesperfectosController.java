package com.uade.api.controllers;

import com.uade.api.services.DesperfectosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="vecinos/desperfectos")
public class DesperfectosController {
    @Autowired
    private DesperfectosService desperfectosService;

    @PostMapping(path="/{id}")
    public ResponseEntity<?> getDesperfectoById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(desperfectosService.findDesperfectoById(id), HttpStatus.OK);
        } catch (Exception e){
            return  new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

}
