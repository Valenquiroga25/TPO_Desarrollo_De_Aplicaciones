package com.uade.api.models;

import jakarta.persistence.*;
import lombok.*;
import org.gradle.internal.impldep.com.fasterxml.jackson.annotation.JsonIdentityInfo;
import org.gradle.internal.impldep.com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="reclamos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idEdificio")
public class ReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idReclamo;
    String documento;
    int idSitio;
    int idDesperfecto;
    String descripcion;
    Estado estado;
    int idReclamoUnificado;
}
