package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="vecinos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "documento")

public class VecinoModel {
    @Id
    private String documento;
    private String nombre;
    private String apellido;
    private String direccion;
    private int codigoBarrio;
    @OneToOne
    @JoinColumn(name = "documento")
    private UsuarioModel usuario;
}
