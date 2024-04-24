package com.uade.api.repositories;

import com.uade.api.models.DesperfectoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DesperfectosRepository extends JpaRepository<DesperfectoModel, Long>{

    Optional<DesperfectoModel> findDesperfectoById(int idDesperfecto);
}