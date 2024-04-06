package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
