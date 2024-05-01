package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

import java.util.List;

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
    private int idDenuncia;
    @ManyToOne
    private VecinoModel vecino;
    @ManyToOne
    private SitioModel sitio;
    private String descripcion;
    private Estado estado;
    private int aceptaResponsabilidad;

    public void DenunciaModel(VecinoModel vecino, SitioModel sitio, String descripcion){
        this.estado = Estado.EN_PROCESO;
    }
}
