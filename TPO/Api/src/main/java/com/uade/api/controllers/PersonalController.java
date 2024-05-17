package com.uade.api.controllers;

import com.uade.api.services.PersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonalController {
    @Autowired
    private PersonalService personalService;
    public ResponseEntity<?> getPersonalByLegajo(@PathVariable Long legajo){
        try {
            return new ResponseEntity<>(personalService.findPersonalByLegajo(legajo), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
}
