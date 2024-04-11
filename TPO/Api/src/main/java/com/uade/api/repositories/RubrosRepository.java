package com.uade.api.repositories;

import com.uade.api.models.RubroModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RubrosRepository extends JpaRepository<RubroModel, Long>{

}