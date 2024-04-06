package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="movimientosReclamo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "legajo")
public class MovimientoReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMovimiento;
    //foreign key from reclamos
    private int idReclamo;
    private String responsable;
    private String causa;

}
