package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="denuncias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idDenuncias")
public class DenunciaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDenuncias;
    //foreign key from vecinos
    private String documento;
    //foreign key from sitios
    private int idSitio;
    private String descripcion;
    private String estado;
    private int aceptaResponsabilidad;
}
