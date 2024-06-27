package com.uade.api.controllers;

import com.uade.api.models.DTOs.PersonalDevueltoDTO;
import com.uade.api.models.PersonalModel;
import com.uade.api.services.PersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path ="/tpo-desarrollo-mobile/personal")
public class PersonalController {
    @Autowired
    private PersonalService personalService;

    @GetMapping(path = "/{legajo}")
    public ResponseEntity<?> getPersonalByLegajo(@PathVariable String legajo){
        try {
            PersonalDevueltoDTO personal = convertoToPersonalDTO(personalService.findPersonalByLegajo(legajo));
            return new ResponseEntity<>(personal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    public PersonalDevueltoDTO convertoToPersonalDTO(PersonalModel personal){
        PersonalDevueltoDTO personalDevueltoDTO = new PersonalDevueltoDTO();
        personalDevueltoDTO.setLegajo(personal.getLegajo());
        personalDevueltoDTO.setNombre(personal.getNombre());
        personalDevueltoDTO.setApellido(personal.getApellido());
        personalDevueltoDTO.setDocumento(personal.getDocumento());
        personalDevueltoDTO.setSector(personal.getSector());
        personalDevueltoDTO.setCategoria(personal.getCategoria());
        return personalDevueltoDTO;
    }
}
