package com.uade.api.models.DTOs;

import com.uade.api.models.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class ReclamoModelDTO {
    private String documentoVecino;
    private String legajoPersonal;
    private String calleSitio;
    private Long numeroSitio;
    private Long idDesperfecto;
    private String descripcion;
    private List<ImagenModel> imagenes;
    private Long idReclamoUnificado;

    public ReclamoModelDTO(String documentoVecino, String legajoPersonal, String calleSitio, Long numeroSitio, Long idDesperfecto, String descripcion,List<ImagenModel> imagenes, Long idReclamoUnificado){
        this.documentoVecino = documentoVecino;
        this.legajoPersonal = legajoPersonal;
        this.calleSitio = calleSitio;
        this.numeroSitio = numeroSitio;
        this.idDesperfecto = idDesperfecto;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.idReclamoUnificado = idReclamoUnificado;
    }
}
