package com.uade.api.repositories;

import com.uade.api.models.DenunciaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DenunciasRepository extends JpaRepository<DenunciaModel, Long>{

}