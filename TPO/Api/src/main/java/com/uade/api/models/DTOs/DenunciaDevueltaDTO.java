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

public class DenunciaDevueltaDTO {
    private Long idDenuncia;
    private String documentoVecino;
    private String calleSitio;
    private Long numeroSitio;
    private String descripcion;
    private Estado estado;
}
