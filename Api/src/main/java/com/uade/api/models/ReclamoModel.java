package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="reclamos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idReclamo")
public class ReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idReclamo;
    //foreign key from vecinos
    String documento;
    //foreign key from sitios
    int idSitio;
    //foreign key from sitios
    int idDesperfecto;
    String descripcion;
    Estado estado;
    ////foreign key from reclamos
    int idReclamoUnificado;
}
