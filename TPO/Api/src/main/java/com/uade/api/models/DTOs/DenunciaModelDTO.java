package com.uade.api.models.DTOs;

import com.uade.api.models.Estado;
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
    private Long idSitio;
    private String descripcion;
    private Estado estado;
    private int aceptaResponsabilidad;
}