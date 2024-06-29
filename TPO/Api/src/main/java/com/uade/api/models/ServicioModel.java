package com.uade.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name = "servicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServicio;
    @ManyToOne
    @JoinColumn(name="documentoVecino")
    private VecinoModel vecino;
    private String titulo;
    private String direccion;
    private String telefono;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name="rubro")
    private RubroModel rubro;
    private String tipoServicio;

    public ServicioModel(VecinoModel vecino, String titulo, String direccion, String telefono, String descripcion, RubroModel rubro, String tipoServicio) {
        this.vecino = vecino;
        this.titulo = titulo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.descripcion = descripcion;
        this.rubro = rubro;
        this.tipoServicio = tipoServicio;
    }
}
