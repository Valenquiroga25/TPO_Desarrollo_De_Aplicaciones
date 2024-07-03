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
        }

        if(newReclamo.getPersonal() != null){
            Optional<PersonalModel> personalOp = Optional.ofNullable(personalService.findPersonalByLegajo(newReclamo.getPersonal().getLegajo()));
            if (personalOp.isEmpty()){
                log.error("El personal con el legajo " + newReclamo.getPersonal().getLegajo() + " no se encuentra registrado en la base de datos!");
                throw new Exception("El personal con el legajo " + newReclamo.getPersonal().getLegajo() + " no se encuentra registrado en la base de datos!");
            }
        }

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioByDireccion(newReclamo.getSitio().getCalle(), newReclamo.getSitio().getNumero()));
        if (sitioOp.isEmpty()){
            log.error("No hay ningún sitio en la dirección " + newReclamo.getSitio().getCalle() + " " + newReclamo.getSitio().getNumero());
            throw new Exception("No hay ningún sitio en la dirección " + newReclamo.getSitio().getCalle() + " " + newReclamo.getSitio().getNumero());
        }

        Optional<DesperfectoModel> desperfectoOp = Optional.ofNullable(desperfectosService.findDesperfectoById(newReclamo.getDesperfecto().getIdDesperfecto()));
        if (desperfectoOp.isEmpty()){
            log.error("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
            throw new Exception("El desperfecto con el id " + newReclamo.getDesperfecto().getIdDesperfecto() + " no se encuentra registrado en la base de datos!");
        }

        return reclamosRepository.save(newReclamo);
    }

    public String updateReclamo(Long id, String calleSitio, Long numeroSitio, String descripcion) throws Exception{
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

        Optional<SitioModel> sitioOp = Optional.ofNullable(sitiosService.findSitioByDireccion(calleSitio, numeroSitio));
        if (sitioOp.isEmpty()){
            log.error("No hay ningún sitio en la dirección " + calleSitio + " " + numeroSitio);
            throw new Exception("No hay ningún sitio en la dirección " + calleSitio + " " + numeroSitio);
        }

        reclamoDb.setSitio(sitioOp.get());
        if(descripcion != null)
            reclamoDb.setDescripcion(descripcion);

        this.reclamosRepository.save(reclamoDb);
        log.info("Reclamo " + reclamoDb.getIdReclamo() + " actualizado correctamente!");
        return "Reclamo actualizado con éxito!";
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

        for(ReclamoModel reclamo : allReclamos){
            if(reclamo.getVecino() != null) {
                if (Objects.equals(reclamo.getVecino().getDocumento(), documento))
                    allReclamosFromVecinos.add(reclamo);
            }
        }
        return allReclamosFromVecinos;
    }

    public List<ReclamoModel> findAllReclamosFromPersonal(String legajo){
        List<ReclamoModel> allReclamos = this.reclamosRepository.findAll();
        List<ReclamoModel> allReclamosFromPersonal = new ArrayList<>();

        for(ReclamoModel reclamo : allReclamos){
            if(reclamo.getPersonal() != null) {
                if (Objects.equals(reclamo.getPersonal().getLegajo(), legajo))
                    allReclamosFromPersonal.add(reclamo);
            }
        }
        return allReclamosFromPersonal;
    }

    public List<ReclamoModel> findAllReclamosFromVecinos() {
        List<ReclamoModel> allReclamos = this.reclamosRepository.findAll();
        List<ReclamoModel> allReclamosFromVecinos = new ArrayList<>();

        for (ReclamoModel reclamo : allReclamos) {
            if (reclamo.getVecino() != null) {
                allReclamosFromVecinos.add(reclamo);
            }
        }
        return allReclamosFromVecinos;
    }

    private void CambiarEstadoReclamo(ReclamoModel reclamo, Estado estado){
        reclamo.setEstado(estado);
    }
}
