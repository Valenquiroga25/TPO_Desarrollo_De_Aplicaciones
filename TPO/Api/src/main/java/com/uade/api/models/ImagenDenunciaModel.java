package com.uade.api.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

@Entity
@Table(name = "imagenesDenuncias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ImagenDenunciaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImagen;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;
    @ManyToOne
    @JoinColumn(name="idDenuncia")
    private DenunciaModel denuncia;

    public ImagenDenunciaModel(byte[] datosImagen, DenunciaModel denuncia) {
        this.datosImagen = datosImagen;
        this.denuncia = denuncia;
    }

    @JsonProperty("datosImagen")
    public String getDatosImagenBase64() {return Base64.getEncoder().encodeToString(this.datosImagen);}
}

