package com.uade.api.controllers;

import com.uade.api.models.ImagenModel;
import com.uade.api.services.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/tpo_desarrollo_mobile/imagenes")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;

    @PostMapping("/")
    public ResponseEntity<String> uploadImagen(@RequestParam("archivo") MultipartFile archivo) {
        try {
            ImagenModel imagen = new ImagenModel();
            imagen.setDatosImagen(archivo.getBytes());
            imagenService.createImagen(imagen);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        ImagenModel imagen = imagenService.findImagenById(id);
        if (imagen != null) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen.getDatosImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

