package com.uade.api.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

@Entity
@Table(name = "imagenes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ImagenModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImagen;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;
    @ManyToOne
    @JoinColumn(name="idServicio")
    private ServicioModel servicio;

    public ImagenModel(byte[] datosImagen, ServicioModel servicio) {
        this.datosImagen = datosImagen;
        this.servicio = servicio;
    }

    @JsonProperty("datosImagen")
    public String getDatosImagenBase64() {return Base64.getEncoder().encodeToString(this.datosImagen);}
}

