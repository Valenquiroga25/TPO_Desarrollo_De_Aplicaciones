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
    private Long idDenuncia;
    @ManyToOne
    @JoinColumn(name="vecino") // Nombre de la columna en la base de datos.
    private VecinoModel vecino;
    @ManyToOne
    @JoinColumn(name="sitio")
    private SitioModel sitio;
    private String descripcion;
    private Estado estado;
    private int aceptaResponsabilidad;

    public DenunciaModel(VecinoModel vecino, SitioModel sitio, String descripcion, Estado estado, int aceptaResponsabilidad) {
        this.estado = Estado.EN_PROCESO;
    }

    public void DenunciaModel(VecinoModel vecino, SitioModel sitio, String descripcion){
        this.estado = Estado.EN_PROCESO;
    }
}
