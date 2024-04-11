package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="desperfectos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idDesperfecto")

public class DesperfectoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDesperfecto;
    private String descripcion;
    @ManyToOne
    private RubroModel rubro;
}
