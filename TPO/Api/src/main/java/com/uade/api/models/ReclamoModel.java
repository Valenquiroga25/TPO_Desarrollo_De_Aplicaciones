package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="reclamos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idReclamo")

public class ReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReclamo;
    @ManyToOne
    @JoinColumn(name="Vecino") // Nombre de la columna en la base de datos.
    private VecinoModel vecino;
    @ManyToOne
    @JoinColumn(name="Personal")
    private PersonalModel personal;
    @ManyToOne
    @JoinColumn(name="Sitio")
    private SitioModel sitio;
    @ManyToOne
    @JoinColumn(name="Desperfecto")
    private DesperfectoModel desperfecto; // Consultar si un reclamo puede tener más de un desperfecto.
    private String descripcion;
    @OneToMany
    @JoinColumn(name="Imagenes")
    private List<ImagenModel> imagenes;
    private Estado estado;
    private int idReclamoUnificado;

    public void ReclamoModel(VecinoModel vecino, PersonalModel personal, SitioModel sitio, DesperfectoModel desperfecto, String descripcion, List<ImagenModel> imagenes){
        this.estado = Estado.EN_PROCESO;
    }
}
