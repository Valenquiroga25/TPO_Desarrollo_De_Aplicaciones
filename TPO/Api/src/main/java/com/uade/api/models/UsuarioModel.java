package com.uade.api.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioModel {
    @Id
    private String identificador;
    private String contrasenia;
    private String mail;
    private String clave_acceso;
    private String tipoUsuario;
}
