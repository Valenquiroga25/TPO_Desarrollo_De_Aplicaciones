package com.uade.api.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

@Entity
@Table(name = "imagenesReclamos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ImagenReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImagen;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;
    @ManyToOne
    @JoinColumn(name="idReclamo")
    private ReclamoModel reclamo;

    public ImagenReclamoModel(byte[] datosImagen, ReclamoModel reclamo) {
        this.datosImagen = datosImagen;
        this.reclamo = reclamo;
    }

    @JsonProperty("datosImagen")
    public String getDatosImagenBase64() {return Base64.getEncoder().encodeToString(this.datosImagen);}
}

