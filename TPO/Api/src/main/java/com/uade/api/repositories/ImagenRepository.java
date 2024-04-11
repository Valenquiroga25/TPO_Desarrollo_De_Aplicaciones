package com.uade.api.repositories;

import com.uade.api.models.ImagenModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepository extends JpaRepository<ImagenModel, Long>{

}
