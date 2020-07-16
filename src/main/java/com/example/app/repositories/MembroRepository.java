package com.example.app.repositories;

import com.example.app.domain.Membro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface MembroRepository extends JpaRepository<Membro, Integer> {
}
