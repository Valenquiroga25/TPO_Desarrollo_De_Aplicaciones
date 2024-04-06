package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Time;
@Entity
@Table(name="sitios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idSitio")
public class SitioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idSitio;
    Double latitud;
    Double longitud;
    String calle;
    int numero;
    String entreCalleA;
    String entreCalleB;
    String descripcion;
    String aCargoDe;
    Time apertura;
    Time cierre;
    String comentarios;
}
