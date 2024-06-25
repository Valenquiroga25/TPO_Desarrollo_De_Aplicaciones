package com.uade.api.services;

import com.uade.api.models.ImagenModel;
import com.uade.api.repositories.ImagenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class ImagenService{

    @Autowired
    private ImagenRepository imagenRepository;

    public void createImagen(ImagenModel newImagen) {
        this.imagenRepository.save(newImagen);
    }

    public ImagenModel findImagenById(Long id) {
        return this.imagenRepository.findImagenByIdImagen(id);
    }

    public List<ImagenModel> findImagenesByIdServicio(Long idServicio) {
        List<ImagenModel> imagenes = this.imagenRepository.findAll();
        List<ImagenModel> imagenesBuscadas = new ArrayList<>();

        for(ImagenModel imagen : imagenes){
            if(imagen.getServicio().getIdServicio() == idServicio)
                imagenesBuscadas.add(imagen);
        }
        return imagenesBuscadas;
    }
}
