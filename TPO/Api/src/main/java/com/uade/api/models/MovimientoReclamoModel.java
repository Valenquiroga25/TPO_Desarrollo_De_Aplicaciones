package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="movimientosReclamo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "legajo")

public class
MovimientoReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMovimiento;
    @ManyToOne
    @JoinColumn(name="idReclamo")
    private ReclamoModel idReclamo;
    @Enumerated(EnumType.STRING)
    private Estado estado;
    private String descripcion;
    private LocalDateTime fecha;

    public MovimientoReclamoModel(ReclamoModel reclamo, Estado estado, String descripcion) {
        this.idReclamo = reclamo;
        this.estado = estado;
        this.descripcion = descripcion;
        this.fecha = LocalDateTime.now();
    }
}
