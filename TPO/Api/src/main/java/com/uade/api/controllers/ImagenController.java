package com.uade.api.controllers;

import com.uade.api.models.*;
import com.uade.api.models.DTOs.ImagenDevueltaDTO;
import com.uade.api.services.DenunciasService;
import com.uade.api.services.ImagenService;
import com.uade.api.services.ReclamosService;
import com.uade.api.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tpo-desarrollo-mobile/imagenes")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private ServicioService servicioService;
    @Autowired
    private ReclamosService reclamosService;
    @Autowired
    private DenunciasService denunciasService;

    @PostMapping("/servicio/")
    public ResponseEntity<String> uploadImagenServicio(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idServicio") Long idServicio) {
        try {
            ServicioModel servicio = this.servicioService.findServicioById(idServicio);
            ImagenServicioModel imagenAux = new ImagenServicioModel(archivo.getBytes(), servicio);
            imagenService.createImagenServicio(imagenAux);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/servicio/{idServicio}")
    public ResponseEntity<?> downloadAllServicios(@PathVariable Long idServicio) {
        try{
            List<ImagenServicioModel> imagenes = this.imagenService.findImagenesByIdServicio(idServicio);
            List<ImagenDevueltaDTO> imagenesDevuetas = new ArrayList<>();
            for(ImagenServicioModel imagen : imagenes)
                imagenesDevuetas.add(convertServicioToDTO(imagen));

            return new ResponseEntity<>(imagenesDevuetas, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/servicio/{idServicio}")
    public ResponseEntity<?> deleteAllServicios(@PathVariable Long idServicio) {
        try{
            List<ImagenServicioModel> imagenes = this.imagenService.findImagenesByIdServicio(idServicio);
            for(ImagenServicioModel imagen : imagenes)
                this.imagenService.deleteImagenServicio(imagen.getIdImagen());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/reclamo/")
    public ResponseEntity<String> uploadImagenReclamo(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idReclamo") Long idReclamo) {
        try {
            ReclamoModel reclamo = this.reclamosService.findReclamoById(idReclamo);
            ImagenReclamoModel imagenAux = new ImagenReclamoModel(archivo.getBytes(), reclamo);
            imagenService.createImagenReclamo(imagenAux);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/reclamo/{idReclamo}")
    public ResponseEntity<?> downloadAllReclamos(@PathVariable Long idReclamo) {
        try{
            List<ImagenReclamoModel> imagenes = this.imagenService.findImagenesByIdReclamos(idReclamo);
            List<ImagenDevueltaDTO> imagenesDevuetas = new ArrayList<>();
            for(ImagenReclamoModel imagen : imagenes)
                imagenesDevuetas.add(convertReclamoToDTO(imagen));

            return new ResponseEntity<>(imagenesDevuetas, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/reclamo/unificado/{idReclamoUnificado}")
    public ResponseEntity<?> downloadAllReclamosByIdUnificado(@PathVariable Long idReclamoUnificado) {
        try{
            List<ImagenReclamoModel> imagenes = this.imagenService.findImagenesByIdReclamosUnificados(idReclamoUnificado);
            List<ImagenDevueltaDTO> imagenesDevuetas = new ArrayList<>();
            for(ImagenReclamoModel imagen : imagenes)
                imagenesDevuetas.add(convertReclamoToDTO(imagen));

            return new ResponseEntity<>(imagenesDevuetas, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/reclamo/{idReclamo}")
    public ResponseEntity<?> deleteAllReclamos(@PathVariable Long idReclamo) {
        try{
            List<ImagenReclamoModel> imagenes = this.imagenService.findImagenesByIdReclamos(idReclamo);
            for(ImagenReclamoModel imagen : imagenes)
                this.imagenService.deleteImagenReclamo(imagen.getIdImagen());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/denuncia/")
    public ResponseEntity<String> uploadImagenDenuncia(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idDenuncia") Long idDenuncia) {
        try {
            DenunciaModel denuncia = this.denunciasService.findDenunciaById(idDenuncia);
            ImagenDenunciaModel imagenAux = new ImagenDenunciaModel(archivo.getBytes(), denuncia);
            imagenService.createImagenDenuncia(imagenAux);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/denuncia/{idDenuncia}")
    public ResponseEntity<?> downloadAllDenuncias(@PathVariable Long idDenuncia) {
        try{
            List<ImagenDenunciaModel> imagenes = this.imagenService.findImagenesByIdDenuncias(idDenuncia);
            List<ImagenDevueltaDTO> imagenesDevuetas = new ArrayList<>();
            for(ImagenDenunciaModel imagen : imagenes)
                imagenesDevuetas.add(convertDenunciaToDTO(imagen));

            return new ResponseEntity<>(imagenesDevuetas, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/denuncia/{idDenuncia}")
    public ResponseEntity<?> deleteAllDenuncias(@PathVariable Long idDenuncia) {
        try{
            List<ImagenDenunciaModel> imagenes = this.imagenService.findImagenesByIdDenuncias(idDenuncia);
            for(ImagenDenunciaModel imagen : imagenes)
                this.imagenService.deleteImagenDeuncia(imagen.getIdImagen());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ImagenDevueltaDTO convertServicioToDTO(ImagenServicioModel imagen){
        return new ImagenDevueltaDTO(imagen.getDatosImagenBase64());
    }

    private ImagenDevueltaDTO convertReclamoToDTO(ImagenReclamoModel imagen){
        return new ImagenDevueltaDTO(imagen.getDatosImagenBase64());
    }

    private ImagenDevueltaDTO convertDenunciaToDTO(ImagenDenunciaModel imagen){
        return new ImagenDevueltaDTO(imagen.getDatosImagenBase64());
    }
}

