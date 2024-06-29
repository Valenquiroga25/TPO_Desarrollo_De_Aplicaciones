package com.uade.api.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicioDevueltoDTO {
    private Long idServicio;
    private String titulo;
    private String direccion;
    private String telefono;
    private String tipoServicio;
    private String rubro;
    private String descripcion;
}
