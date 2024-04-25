package com.uade.api.services;

import com.uade.api.models.PersonalModel;
import com.uade.api.models.VecinoModel;
import com.uade.api.repositories.PersonalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class PersonalService {

    @Autowired
    private PersonalRepository personalRepository;

    public PersonalModel findPersonalByLegajo(int legajo) throws Exception{
        log.info("Legajo ingresado " + legajo);
        if(legajo < 0){
            log.error("El legajo ingresado no es válido. Ingrese un legajo positivo!");
            throw new Exception("El legajo no es válido. Ingrese un legajo positivo!");
        }
        Optional<PersonalModel> personalOp = this.personalRepository.findByLegajo(legajo);
        if (personalOp.isEmpty()){
            log.error("El personal con el legajo " + legajo + " no se encuentra registrado en la base de datos!");
            throw new Exception("El personal con el legajo " + legajo + " no se encuentra registrado en la base de datos!");
        }
        return personalOp.get();
    }
}
