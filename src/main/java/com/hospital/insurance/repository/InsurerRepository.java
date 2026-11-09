package com.hospital.insurance.repository;

import com.hospital.insurance.entity.Insurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Long> {
    List<Insurer> findByPackageName(String packageName);
    
    Optional<Insurer> findByInsurerName(String insurerName);
    
    List<Insurer> findByActive(Boolean active);
    
    List<Insurer> findByInsuranceAmountLimitGreaterThanEqual(Double amount);
}