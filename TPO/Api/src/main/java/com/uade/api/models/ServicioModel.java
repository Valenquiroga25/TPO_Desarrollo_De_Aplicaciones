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
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    @ManyToOne
    private RubroModel rubro;
    private String descripcion;
    @OneToMany
    private List<ImagenModel> imagenes;
}
