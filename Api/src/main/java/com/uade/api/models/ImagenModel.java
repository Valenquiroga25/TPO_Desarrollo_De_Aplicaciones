package com.uade.api.models;

import jakarta.persistence.*;
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
    private Long id;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;
}

