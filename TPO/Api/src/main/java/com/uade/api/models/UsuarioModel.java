package com.uade.api.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="usuarios")
public class UsuarioModel {
    @Id
    private String identificador;
    private String contrasenia;
    private String mail;
    private String clave_acceso;
    private String tipoUsuario;

    public UsuarioModel(String identificador, String contrasenia, String mail, String tipoUsuario){
        this.identificador=identificador;
        this.contrasenia=contrasenia;
        this.mail=mail;
        this.tipoUsuario=tipoUsuario;
    }
}
