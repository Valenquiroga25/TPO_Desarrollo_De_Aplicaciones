package com.uade.api.repositories;

import com.uade.api.models.DenunciaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DenunciasRepository extends JpaRepository<DenunciaModel, Long>{
    Optional<DenunciaModel> findDenunciaById(int idDenuncia);
}