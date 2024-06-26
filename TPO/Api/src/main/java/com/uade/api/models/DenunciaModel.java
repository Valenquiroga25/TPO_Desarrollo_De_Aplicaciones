package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idDenuncia")

public class DenunciaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDenuncia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="vecino") // Nombre de la columna en la base de datos.
    private VecinoModel vecino;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="sitio")
    private SitioModel sitio;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private int aceptaResponsabilidad;

    public DenunciaModel(VecinoModel vecino, SitioModel sitio, String descripcion, int aceptaResponsabilidad) {
        this.vecino = vecino;
        this.sitio = sitio;
        this.descripcion = descripcion;
        this.estado = Estado.EN_PROCESO;
        this.aceptaResponsabilidad = aceptaResponsabilidad;
    }

}
