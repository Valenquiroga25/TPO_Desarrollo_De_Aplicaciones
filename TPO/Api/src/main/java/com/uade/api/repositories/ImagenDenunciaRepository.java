package com.uade.api.repositories;

import com.uade.api.models.ImagenDenunciaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagenDenunciaRepository extends JpaRepository<ImagenDenunciaModel, Long> {
    ImagenDenunciaModel findDenunciaByIdImagen(Long id);
}
