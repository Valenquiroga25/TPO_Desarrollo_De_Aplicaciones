package com.uade.api.services;

import com.uade.api.models.BarrioModel;
import com.uade.api.repositories.BarriosRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class BarriosService {
    @Autowired
    BarriosRepository barriosRepository;

    public BarrioModel findBarrioById(int id) throws Exception{
        Optional<BarrioModel> barrioOp = barriosRepository.findBarrioById(id);
        if(barrioOp.isEmpty()){
            log.error("El barrio no se encuentra registrado en la base de datos!");
            throw new Exception("El barrio no se encuentra registrado en la base de datos!");
        }
        return barrioOp.get();
    }
}
