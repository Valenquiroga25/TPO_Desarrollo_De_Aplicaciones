package com.uade.api.repositories;

import com.uade.api.models.BarrioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BarriosRepository extends JpaRepository<BarrioModel, Long>{

    Optional<BarrioModel> findBarrioById(int id);
}