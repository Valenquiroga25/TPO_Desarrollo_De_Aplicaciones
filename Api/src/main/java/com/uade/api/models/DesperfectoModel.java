package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
