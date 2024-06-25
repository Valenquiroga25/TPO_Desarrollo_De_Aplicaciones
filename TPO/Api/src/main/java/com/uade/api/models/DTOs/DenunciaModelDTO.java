package com.uade.api.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DenunciaModelDTO {
    private String documentoVecino;
    private String calleSitio;
    private Long numeroSitio;
    private String descripcion;
    private int aceptaResponsabilidad;
}