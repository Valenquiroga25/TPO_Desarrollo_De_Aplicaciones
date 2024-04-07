package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="barrios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idBarrio")
public class BarrioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idBarrio;
    private String nombre;

}
