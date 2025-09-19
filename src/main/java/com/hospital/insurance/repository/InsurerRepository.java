package com.hospital.insurance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.insurance.entity.Insurer;

@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Long> {
    List<Insurer> findByPackageName(String packageName);

    Optional<Insurer> findByInsurerName(String insurerName);

    List<Insurer> findByActive(Boolean active);

    List<Insurer> findByInsuranceAmountLimitGreaterThanEqual(Double amount);
}