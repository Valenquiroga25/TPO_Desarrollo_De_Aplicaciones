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
    private int idServicio;
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
    @OneToMany
    @JoinColumn(name="idImagen")
    private List<ImagenModel> imagenes;
    private String tipoServicio;

    public ServicioModel(VecinoModel vecino, String titulo, String direccion, String telefono, String descripcion, RubroModel rubro, List<ImagenModel> imagenes, String tipoServicio) {
        this.vecino = vecino;
        this.titulo = titulo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.descripcion = descripcion;
        this.rubro = rubro;
        this.imagenes = imagenes;
        this.tipoServicio = tipoServicio;
    }
}
