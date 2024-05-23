package com.uade.api.models.DTOs;

import com.uade.api.models.ImagenModel;
import com.uade.api.models.VecinoModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComercioModelDTO {
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    private String descripcion;
    private List<ImagenModel> imagenes;
}
