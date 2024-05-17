package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
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
    private Long idSitio;
    private Double latitud;
    private Double longitud;
    private String calle;
    private int numero;
    private String entreCalleA;
    private String entreCalleB;
    private String descripcion;
    private String aCargoDe;
    private Time apertura;
    private Time cierre;
    private String comentarios;
}
