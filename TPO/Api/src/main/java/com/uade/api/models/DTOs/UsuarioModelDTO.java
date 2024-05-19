package com.uade.api.models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioModelDTO {
    private String identificador;
    private String mail;
    private String tipoUsuario;
}
