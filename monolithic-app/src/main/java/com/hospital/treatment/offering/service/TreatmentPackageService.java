package com.hospital.treatment.offering.service;

import com.hospital.treatment.offering.dto.TreatmentPackageDTO;
import com.hospital.treatment.offering.entity.TreatmentPackage;
import com.hospital.treatment.offering.repository.TreatmentPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TreatmentPackageService {
    
    @Autowired
    private TreatmentPackageRepository packageRepository;
    
    @Transactional(readOnly = true)
    public List<TreatmentPackageDTO> getAllPackages() {
        return packageRepository.findAll()
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TreatmentPackageDTO getPackageByName(String name) {
        TreatmentPackage pkg = packageRepository.findByName(name)
                                   .orElseThrow(() -> new RuntimeException("Package not found: " + name));
        return convertToDTO(pkg);
    }
    
    @Transactional(readOnly = true)
    public List<TreatmentPackageDTO> getPackagesBySpecialization(String specialization) {
        return packageRepository.findBySpecialization(specialization)
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    @Transactional
    public TreatmentPackageDTO updatePackage(Long packageId, TreatmentPackageDTO packageDTO) {
        TreatmentPackage existingPackage = packageRepository.findById(packageId)
                                               .orElseThrow(() -> new RuntimeException("Package not found with id: " + packageId));
        
        existingPackage.setName(packageDTO.getName());
        existingPackage.setSpecialization(packageDTO.getSpecialization());
        existingPackage.setTests(packageDTO.getTests());
        existingPackage.setCost(packageDTO.getCost());
        existingPackage.setDurationWeeks(packageDTO.getDurationWeeks());
        existingPackage.setPackageLevel(packageDTO.getPackageLevel());
        
        TreatmentPackage updatedPackage = packageRepository.save(existingPackage);
        return convertToDTO(updatedPackage);
    }
    
    private TreatmentPackageDTO convertToDTO(TreatmentPackage pkg) {
        return new TreatmentPackageDTO(
            pkg.getId(),
            pkg.getName(),
            pkg.getSpecialization(),
            pkg.getTests(),
            pkg.getCost(),
            pkg.getDurationWeeks(),
            pkg.getPackageLevel()
        );
    }
    
    @SuppressWarnings("unused")
    private TreatmentPackage convertToEntity(TreatmentPackageDTO dto) {
        return new TreatmentPackage(
            dto.getName(),
            dto.getSpecialization(),
            dto.getTests(),
            dto.getCost(),
            dto.getDurationWeeks(),
            dto.getPackageLevel()
        );
    }
}