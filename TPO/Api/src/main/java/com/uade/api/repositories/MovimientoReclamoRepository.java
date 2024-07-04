package com.uade.api.repositories;

import com.uade.api.models.MovimientoReclamoModel;
import com.uade.api.models.ReclamoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoReclamoRepository extends JpaRepository<MovimientoReclamoModel,Long> {
    List<MovimientoReclamoModel> getMovimientosReclamoModelByIdReclamo(ReclamoModel reclamo);
}
