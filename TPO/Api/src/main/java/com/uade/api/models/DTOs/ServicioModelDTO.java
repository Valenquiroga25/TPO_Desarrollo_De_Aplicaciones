package com.uade.api.models.DTOs;

import com.uade.api.models.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
