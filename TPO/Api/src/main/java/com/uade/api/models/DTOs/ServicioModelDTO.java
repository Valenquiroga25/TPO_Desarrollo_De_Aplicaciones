package com.uade.api.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicioModelDTO {
    private String documentoVecino;
    private String titulo;
    private String direccion;
    private String telefono;
    private String descripcion;
    private Long idRubro;
    private String tipoServicio;
}
