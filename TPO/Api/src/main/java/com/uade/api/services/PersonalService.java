package com.uade.api.services;

import com.uade.api.models.PersonalModel;
import com.uade.api.repositories.PersonalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PersonalService {

    @Autowired
    private PersonalRepository personalRepository;

}
