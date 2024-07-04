package com.uade.api.controllers;

import com.uade.api.models.DTOs.ReclamoPersonalDevueltoDTO;
import com.uade.api.models.DTOs.ReclamoVecinoDevueltoDTO;
import com.uade.api.models.DTOs.ReclamoModelDTO;
import com.uade.api.models.*;
import com.uade.api.services.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin() // Para que un controlador externo (un front alojado en otro dominio) acceda a nuestro sistema.
@RestController
@RequestMapping(path ="/tpo-desarrollo-mobile/reclamos")
public class ReclamosController {

    @Autowired
    ReclamosService reclamosService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    PersonalService personalService;
    @Autowired
    SitiosService sitiosService;
    @Autowired
    DesperfectosService desperfectosService;

    @PostMapping(path = "/")
    public ResponseEntity<?> createReclamo(@RequestBody ReclamoModelDTO reclamoDTO){ // RequestBody -> Se utiliza para vincular el cuerpo de un objeto con el dato que se pasa como parámetro (para actualizar o crear un objeto).
        try{
            ReclamoModel reclamo = convertToEntity(reclamoDTO);
            return new ResponseEntity<>(reclamosService.createReclamo(reclamo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateReclamo(@PathVariable Long id,@RequestBody ReclamoModelDTO reclamoDTO){
        try{
            return new ResponseEntity<>(this.reclamosService.updateReclamo(id,reclamoDTO.getCalleSitio(), reclamoDTO.getNumeroSitio(), reclamoDTO.getDescripcion()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<?> deleteReclamo(@PathVariable Long id){ // PathVariable -> Se utiliza para encontrar el objeto en la BD que tiene el ID que se manda.
        try{
            return new ResponseEntity<>(this.reclamosService.deleteReclamo(id),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    @PutMapping(path = "/cambiarEstado/{id}")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id,@RequestBody Estado estado){
        try{
            return new ResponseEntity<>(this.reclamosService.CambiarEstadoReclamo(id, estado), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getReclamoById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(this.reclamosService.findReclamoById(id),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "/allFromVecino/{documento}")
    public ResponseEntity<?> getAllReclamosByDocumento(@PathVariable String documento){
        try{
            List<ReclamoModel> allReclamos = this.reclamosService.findAllReclamosFromVecino(documento);
            List<ReclamoVecinoDevueltoDTO> allReclamosDevueltos = new ArrayList<>();
            for(ReclamoModel reclamo : allReclamos)
                allReclamosDevueltos.add(convertToVecinoDTO(reclamo));
            return new ResponseEntity<>(allReclamosDevueltos,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "allFromPersonal/{legajo}")
    public ResponseEntity<?> getAllReclamosByLegajo(@PathVariable String legajo){
        try{
            List<ReclamoModel> allReclamos = this.reclamosService.findAllReclamosFromPersonal(legajo);
            List<ReclamoPersonalDevueltoDTO> allReclamosDevueltos = new ArrayList<>();
            for(ReclamoModel reclamo : allReclamos)
                allReclamosDevueltos.add(convertToPersonalDTO(reclamo));
            return new ResponseEntity<>(allReclamosDevueltos,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "/allFromVecinos")
    public ResponseEntity<?> getAllReclamosFromVecinos() {
        try {
            List<ReclamoModel> allReclamos = this.reclamosService.findAllReclamosFromVecinos();
            List<ReclamoVecinoDevueltoDTO> allReclamosDevueltos = new ArrayList<>();
            for(ReclamoModel reclamo : allReclamos)
                allReclamosDevueltos.add(convertToVecinoDTO(reclamo));
            return new ResponseEntity<>(allReclamosDevueltos,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    private ReclamoModel convertToEntity(ReclamoModelDTO reclamoDTO) throws Exception{
        if(!Objects.equals(reclamoDTO.getDocumentoVecino(), "") && !Objects.equals(reclamoDTO.getLegajoPersonal(), ""))
            throw new Exception("El reclamo no puede ser de un vecino y un inspector a la vez!");

        else if(!Objects.equals(reclamoDTO.getDocumentoVecino(), "")){
            ReclamoModel reclamo = new ReclamoModel(
                    vecinosService.findVecinoByDocumento(reclamoDTO.getDocumentoVecino()),
                    sitiosService.findSitioByDireccion(reclamoDTO.getCalleSitio(),reclamoDTO.getNumeroSitio()),
                    desperfectosService.findDesperfectoById(reclamoDTO.getIdDesperfecto()),
                    reclamoDTO.getDescripcion()
            );
            return reclamo;

        } else{
            ReclamoModel reclamo = new ReclamoModel(
                    personalService.findPersonalByLegajo(reclamoDTO.getLegajoPersonal()),
                    sitiosService.findSitioByDireccion(reclamoDTO.getCalleSitio(),reclamoDTO.getNumeroSitio()),
                    desperfectosService.findDesperfectoById(reclamoDTO.getIdDesperfecto()),
                    reclamoDTO.getDescripcion()
            );
            return reclamo;
        }
    }

    public ReclamoVecinoDevueltoDTO convertToVecinoDTO(ReclamoModel reclamo){
        ReclamoVecinoDevueltoDTO reclamoDTO = new ReclamoVecinoDevueltoDTO(
                reclamo.getIdReclamo(),
                reclamo.getVecino().getDocumento(),
                reclamo.getSitio().getCalle(),
                reclamo.getSitio().getNumero(),
                reclamo.getEstado(),
                reclamo.getDesperfecto().getDescripcion(),
                reclamo.getDescripcion());
        return reclamoDTO;
    }

    public ReclamoPersonalDevueltoDTO convertToPersonalDTO(ReclamoModel reclamo){
        ReclamoPersonalDevueltoDTO reclamoDTO = new ReclamoPersonalDevueltoDTO(
                reclamo.getIdReclamo(),
                reclamo.getPersonal().getLegajo(),
                reclamo.getSitio().getCalle(),
                reclamo.getSitio().getNumero(),
                reclamo.getEstado(),
                reclamo.getDesperfecto().getDescripcion(),
                reclamo.getDescripcion());
        return reclamoDTO;
    }
}
