package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

@Entity
@Table(name="rubros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idRubro")

public class RubroModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRubro;
    private String descripcion;
}
