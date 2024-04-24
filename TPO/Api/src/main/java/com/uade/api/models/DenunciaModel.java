package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

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
    @ManyToOne
    private VecinoModel vecino;
    @ManyToOne
    private SitioModel sitio;
    private String descripcion;
    private String estado;
    private int aceptaResponsabilidad;
}
