package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="servicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idServicio")
public class ServicioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idServicio;
    @ManyToOne
    @JoinColumn(name="Vecino")
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    @ManyToOne
    @JoinColumn(name="Rubro")
    private RubroModel rubro;
    private String descripcion;
    @OneToMany
    @JoinColumn(name="Imagenes")
    private List<ImagenModel> imagenes;
}
