package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

@Entity
@Table(name="desperfectos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idDesperfecto")

public class DesperfectoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDesperfecto;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name="Rubro")
    private RubroModel rubro;
}
