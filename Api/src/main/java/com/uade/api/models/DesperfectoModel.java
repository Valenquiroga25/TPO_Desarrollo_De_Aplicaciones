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
    int idDesperfecto;
    String descripcion;
    int idRubro;
}
