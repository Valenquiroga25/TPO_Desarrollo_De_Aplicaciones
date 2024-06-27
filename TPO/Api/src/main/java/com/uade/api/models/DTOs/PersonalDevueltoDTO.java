package com.uade.api.models.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDevueltoDTO {
    private String legajo;
    private String nombre;
    private String apellido;
    private String documento;
    private String sector;
    private int categoria;
}
