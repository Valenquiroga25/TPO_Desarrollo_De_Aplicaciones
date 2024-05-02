package com.uade.api.repositories;

import com.uade.api.models.PersonalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalRepository extends JpaRepository<PersonalModel, Long>{
}