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
public class ReclamoPersonalDevueltoDTO {
    private Long idReclamo;
    private String legajoPersonal;
    private String calleSitio;
    private Long numeroSitio;
    private Estado estado;
    private String desperfecto;
    private String descripcion;
}
