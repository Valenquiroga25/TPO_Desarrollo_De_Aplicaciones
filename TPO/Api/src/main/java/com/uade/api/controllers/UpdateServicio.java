package com.uade.api.controllers;

import com.uade.api.models.ImagenModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UpdateServicio {
    private String descripcion;
    private List<ImagenModel> imagenes;
}
