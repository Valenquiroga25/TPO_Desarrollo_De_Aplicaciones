package com.uade.api.models.DTOs;

import com.uade.api.models.Estado;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CambiarEstadoDTO {
    private Estado estado;
    private String descripcionMovimiento;
}
