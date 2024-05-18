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
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    private RubroModel rubro;
    private String descripcion;
    private List<ImagenModel> imagenes;
}
