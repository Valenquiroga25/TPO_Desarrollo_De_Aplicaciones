package com.uade.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class ServicioModel {
    @ManyToOne
    @JoinColumn(name="documentoVecino")
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    private String descripcion;
    @OneToMany
    @JoinColumn(name="idImagen")
    private List<ImagenModel> imagenes;
}
