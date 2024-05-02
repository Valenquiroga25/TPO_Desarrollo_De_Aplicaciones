package com.uade.api.models;

import javax.persistence.*;
import lombok.*;

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
}

