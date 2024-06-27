package com.uade.api.controllers;

import com.uade.api.models.DTOs.VecinoDevueltoDTO;
import com.uade.api.models.VecinoModel;
import com.uade.api.services.VecinosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path ="/tpo-desarrollo-mobile/vecinos")
public class VecinosController {
    @Autowired
    private VecinosService vecinosService;

    @GetMapping(path = "/{documento}")
    public ResponseEntity<?> getVecinoByDocumento(@PathVariable String documento){
        try {
            VecinoDevueltoDTO vecino = convertToVecinoDTO(vecinosService.findVecinoByDocumento(documento));
            return new ResponseEntity<>(vecino, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    public VecinoDevueltoDTO convertToVecinoDTO(VecinoModel vecino){
        VecinoDevueltoDTO vecinoDevueltoDTO = new VecinoDevueltoDTO();
        vecinoDevueltoDTO.setDocumento(vecino.getDocumento());
        vecinoDevueltoDTO.setNombre(vecino.getNombre());
        vecinoDevueltoDTO.setApellido(vecino.getApellido());
        vecinoDevueltoDTO.setDireccion(vecino.getDireccion());
        vecinoDevueltoDTO.setCodigoBarrio(vecino.getCodigoBarrio());
        return vecinoDevueltoDTO;
    }
}
