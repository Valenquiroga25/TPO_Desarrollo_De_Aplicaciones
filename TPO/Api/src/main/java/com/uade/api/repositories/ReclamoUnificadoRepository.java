package com.uade.api.repositories;

import com.uade.api.models.ReclamoUnificadoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReclamoUnificadoRepository extends JpaRepository<ReclamoUnificadoModel, Long>{
}
