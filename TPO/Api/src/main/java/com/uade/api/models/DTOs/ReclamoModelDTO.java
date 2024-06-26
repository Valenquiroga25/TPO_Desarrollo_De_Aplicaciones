package com.uade.api.models.DTOs;

import com.uade.api.models.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ReclamoModelDTO {
    private String documentoVecino;
    private String legajoPersonal;
    private String calleSitio;
    private Long numeroSitio;
    private Long idDesperfecto;
    private String descripcion;
    private List<ImagenModel> imagenes;
    private Long idReclamoUnificado;
}
