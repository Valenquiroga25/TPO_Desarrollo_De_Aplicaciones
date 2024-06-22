package com.uade.api.models.DTOs;

import com.uade.api.models.ServicioModel;
import com.uade.api.models.UsuarioModel;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ImagenDTO {
    private Long idImagen;
    private String datosImagen;
    private UsuarioModel usuario;
    private ServicioModel servicio;
}
