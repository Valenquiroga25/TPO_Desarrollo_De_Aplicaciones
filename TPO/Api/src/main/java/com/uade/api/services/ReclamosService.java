package com.uade.api.services;

import com.uade.api.models.*;
import com.uade.api.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class ReclamosService {

    @Autowired
    private ReclamosRepository reclamosRepository;
    @Autowired
    private VecinosService vecinosService;
    @Autowired
    private PersonalService personalService;
    @Autowired
    private SitiosService sitiosService;
    @Autowired
    private DesperfectosService desperfectosService;
    @Autowired
    private ImagenService imagenService;

    public ReclamoModel createReclamo(ReclamoModel newReclamo) throws Exception{

        // Verificamos que no estén ambos campos vacíos.
        if(newReclamo.getVecino() == null && newReclamo.getPersonal() == null){
            log.info("El reclamo debe tener un vecino o un personal asociado");
            throw new Exception("El reclamo debe tener un vecino o un personal asociado");
        }

        // Verificamos que no estén ambos campos llenos.
        if(newReclamo.getVecino() != null && newReclamo.getPersonal() != null){
            log.info("El reclamo debe tener un solo tipo de usuario asociado");
            throw new Exception("El reclamo debe tener un solo tipo de usuario asociado");
        }

        if(newReclamo.getVecino() != null){
            Optional<VecinoModel> vecinoOp = Optional.ofNullable(vecinosService.findVecinoByDocumento(newReclamo.getVecino().getDocumento()));
            if (vecinoOp.isEmpty()){
                log.error("El vecino con el documento " + newReclamo.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
                throw new Exception("El vecino con el documento " + newReclamo.getVecino().getDocumento() + " no se encuentra registrado en la base de datos!");
            }

            if(newReclamo.getImagenes().size() > 7){
                log.error("El reclamo no puede tener más de 7 imágenes.");
                throw new Exception("El reclamo no puede tener más de 7 imágenes.");
            }
        }

        if(newReclamo.getPersonal() != null){
            Optional<PersonalModel> personalOp = Optional.ofNullable(personalService.findPersonalByLegajo(newReclamo.getPersonal().getLegajo()));
            if (personalOp.isEmpty()){
                log.error("El personal con el legajo " + newReclamo.getPersonal().getLegajo() + " no se encuentra registrado en la base de datos!");
                throw new Exception("El personal con el legajo " + newReclamo.getPersonal().getLegajo() + " no se encuentra registrado en la base de datos!");
            }
        }

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioById(newReclamo.getSitio().getIdSitio()));
        if (sitioOp.isEmpty()){
            log.error("El sitio con el id " + newReclamo.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El sitio con el id " + newReclamo.getSitio().getIdSitio() + " no se encuentra registrado en la base de datos!");
        }

        Optional<DesperfectoModel> desperfectoOp = Optional.ofNullable(desperfectosService.findDesperfectoById(newReclamo.getDesperfecto().getIdDesperfecto()));
        if (desperfectoOp.isEmpty()){
            log.error("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
        }

        return reclamosRepository.save(newReclamo);
    }

    public ReclamoModel updateReclamo(Long id, Long idDesperfecto, String descripcion, List<ImagenModel> imagenes) throws Exception{
        if(id < 0){
            log.error("El Id no es válido. El Id debe ser positivo!");
            throw new Exception("El Id no es válido. El Id debe ser positivo!");
        }

        Optional<ReclamoModel> reclamoOp = reclamosRepository.findById(id);

        if(reclamoOp.isEmpty()){
            log.error("El reclamo con el Id " + id + " no se encuentra registrado en la base de datos.");
            throw new Exception("El reclamo con el Id " + id + " no se encuentra registrado en la base de datos.");
        }

        ReclamoModel reclamoDb = reclamoOp.get();
        if(idDesperfecto != null)
            reclamoDb.getDesperfecto().setIdDesperfecto(idDesperfecto);
        if(descripcion != null)
            reclamoDb.setDescripcion(descripcion);
        if(imagenes != null)
            reclamoDb.setImagenes(imagenes);

        log.info("Reclamo " + reclamoDb.getIdReclamo() + " actualizado correctamente!");
        return this.reclamosRepository.save(reclamoDb);
    }

    // Estas dos funciones hay que ver si se usan más adelante.
    public List<ImagenModel> agregarImagen(List<ImagenModel> imagenes, ImagenModel imagen) throws Exception{
        if(imagenes.size() > 7)
            throw new Exception("La lista de imágenes se encuenta llena, elimine una imágen para poder agregarla");
        imagenes.add(imagen);

        return imagenes;
    }

    // Estas dos funciones hay que ver si se usan más adelante.
    public List<ImagenModel> eliminarImagen(List<ImagenModel> imagenes, ImagenModel imagen) throws Exception{
        Optional<ImagenModel> imagenOp = Optional.ofNullable(imagenService.findImagenById(imagen.getIdImagen()));
        if(imagenOp.isEmpty()) {
            log.error("La lista de imágenes se encuenta llena, elimine una imágen para poder agregarla");
            throw new Exception("La lista de imágenes se encuenta llena, elimine una imágen para poder agregarla");
        }

        ImagenModel imagenDb = imagenOp.get();
        imagenes.remove(imagenDb);

        return imagenes;
    }

    public String deleteReclamo(Long id) throws Exception{
        Optional<ReclamoModel> reclamoOp = this.reclamosRepository.findById(id);

        if (reclamoOp.isEmpty()){
            log.error("El reclamo con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El reclamo con el id " + id + " no está registrado en la base de datos.");
        }

        ReclamoModel reclamoDb = reclamoOp.get();
        this.reclamosRepository.delete(reclamoDb);

        return "Reclamo eliminado con éxito!";
    }

    public ReclamoModel findReclamoById (Long id) throws Exception{
        Optional<ReclamoModel> reclamoOp = this.reclamosRepository.findById(id);
        if(reclamoOp.isEmpty()){
            log.error("El reclamo con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El reclamo con el id " + id + " no está registrado en la base de datos.");
        }

        return reclamoOp.get();
    }

    public List<ReclamoModel> findAllReclamosFromVecino(String documento){
        List<ReclamoModel> allReclamos = this.reclamosRepository.findAll();
        List<ReclamoModel> allReclamosFromVecinos = new ArrayList<>();

        for(ReclamoModel r : allReclamos){
            if (Objects.equals(r.getVecino().getDocumento(), documento))
                allReclamosFromVecinos.add(r);
        }
        return allReclamosFromVecinos;
    }

    public List<ReclamoModel> findAllReclamosFromPersonal(String legajo){
        List<ReclamoModel> allReclamos = this.reclamosRepository.findAll();
        List<ReclamoModel> allReclamosFromPersonal = new ArrayList<>();

        for(ReclamoModel r : allReclamos){
            if (Objects.equals(r.getPersonal().getLegajo(), legajo))
                allReclamosFromPersonal.add(r);
        }
        return allReclamosFromPersonal;
    }

    private void CambiarEstadoReclamo(ReclamoModel reclamo, Estado estado){
        reclamo.setEstado(estado);
    }
}
