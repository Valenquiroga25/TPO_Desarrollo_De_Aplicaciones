package com.uade.api.services;

import com.uade.api.models.ImagenModel;
import com.uade.api.repositories.ImagenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class ImagenService{

    @Autowired
    private ImagenRepository imagenRepository;

    public ImagenModel createImagen(ImagenModel newImagen) {return this.imagenRepository.save(newImagen);}

    public ImagenModel findImagenById(Long id) {
        Optional<ImagenModel> imagenOpt = imagenRepository.findById(id);
        return imagenOpt.orElse(null);
    }
}
