package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="vecinos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "documento")

public class VecinoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String documento;
    private String nombre;
    private String apellido;
    private String direccion;
    //foreign key from barrios
    private int codigoBarrio;
}
