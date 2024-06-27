package com.uade.api.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class VecinoDevueltoDTO {
    private String documento;
    private String nombre;
    private String apellido;
    private String direccion;
    private int codigoBarrio;
}
