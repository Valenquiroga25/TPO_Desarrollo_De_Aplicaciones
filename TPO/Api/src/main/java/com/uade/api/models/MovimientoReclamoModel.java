package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

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
    @ManyToOne
    private ReclamoModel reclamo;
    private String responsable;
    private String causa;

}