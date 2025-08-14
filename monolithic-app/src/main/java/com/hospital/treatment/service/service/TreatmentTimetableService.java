package com.hospital.treatment.service.service;

import com.hospital.treatment.service.dto.PatientDetailRequest;
import com.hospital.treatment.service.dto.TreatmentPlanResponse;
import com.hospital.treatment.service.entity.PatientDetail;
import com.hospital.treatment.service.entity.TreatmentPlan;
import com.hospital.treatment.service.repository.PatientDetailRepository;
import com.hospital.treatment.service.repository.TreatmentPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class TreatmentTimetableService {
    
    @Autowired
    private PatientDetailRepository patientRepository;
    
    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;
    
    public TreatmentPlanResponse formulateTreatmentTimetable(PatientDetailRequest request) {
        // Save patient details
        PatientDetail patient = new PatientDetail(
            request.getName(),
            request.getAge(),
            request.getAilment(),
            request.getPackageName(),
            request.getTreatmentStartDate()
        );
        patient.setContactNumber(request.getContactNumber());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        
        PatientDetail savedPatient = patientRepository.save(patient);
        
        // Determine package details and specialist assignment
        PackageInfo packageInfo = getPackageInfo(request.getPackageName());
        SpecialistAssignment specialist = assignSpecialist(packageInfo);
        
        // Calculate treatment end date
        LocalDate endDate = request.getTreatmentStartDate().plusWeeks(packageInfo.durationWeeks);
        savedPatient.setTreatmentEndDate(endDate);
        patientRepository.save(savedPatient);
        
        // Create treatment plan
        TreatmentPlan treatmentPlan = new TreatmentPlan(
            savedPatient.getId(),
            request.getPackageName(),
            packageInfo.tests,
            packageInfo.cost,
            specialist.name,
            specialist.level,
            packageInfo.specialization,
            request.getTreatmentStartDate(),
            endDate,
            packageInfo.durationWeeks
        );
        treatmentPlan.setSpecialistContactNumber(specialist.contactNumber);
        treatmentPlan.setSpecialistEmail(specialist.email);
        
        TreatmentPlan savedPlan = treatmentPlanRepository.save(treatmentPlan);
        
        // Build comprehensive response
        return buildTreatmentPlanResponse(savedPatient, savedPlan, packageInfo, specialist);
    }
    
    public List<PatientDetail> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public List<PatientDetail> getPatientsByStatus(String status) {
        return patientRepository.findByTreatmentStatus(status);
    }
    
    public TreatmentPlanResponse getTreatmentPlan(Long patientId) {
        PatientDetail patient = patientRepository.findById(patientId)
                                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));
        
        TreatmentPlan plan = treatmentPlanRepository.findByPatientId(patientId)
                                 .orElseThrow(() -> new RuntimeException("Treatment plan not found for patient: " + patientId));
        
        PackageInfo packageInfo = getPackageInfo(patient.getTreatmentPackageName());
        SpecialistAssignment specialist = new SpecialistAssignment(
            plan.getSpecialistName(), plan.getSpecialistLevel(), plan.getSpecialization(),
            plan.getSpecialistContactNumber(), plan.getSpecialistEmail(), "MBBS, MS", 10
        );
        
        return buildTreatmentPlanResponse(patient, plan, packageInfo, specialist);
    }
    
    public void updateTreatmentStatus(Long patientId, String status) {
        PatientDetail patient = patientRepository.findById(patientId)
                                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));
        
        patient.setTreatmentStatus(status);
        patientRepository.save(patient);
        
        treatmentPlanRepository.findByPatientId(patientId).ifPresent(plan -> {
            plan.setStatus(status);
            treatmentPlanRepository.save(plan);
        });
    }
    
    private PackageInfo getPackageInfo(String packageName) {
        // Predefined package information based on requirements
        return switch (packageName.toLowerCase()) {
            case "orthopaedics package 1" -> new PackageInfo("Orthopaedics Package 1", "Orthopaedics",
                Arrays.asList("OPT1", "OPT2"), 2500.0, 4, 1);
            case "orthopaedics package 2" -> new PackageInfo("Orthopaedics Package 2", "Orthopaedics",
                Arrays.asList("OPT3", "OPT4"), 3000.0, 6, 2);
            case "urology package 1" -> new PackageInfo("Urology Package 1", "Urology",
                Arrays.asList("UPT1", "UPT2"), 4000.0, 4, 1);
            case "urology package 2" -> new PackageInfo("Urology Package 2", "Urology",
                Arrays.asList("UPT3", "UPT4"), 5000.0, 6, 2);
            default -> throw new RuntimeException("Unknown package: " + packageName);
        };
    }
    
    private SpecialistAssignment assignSpecialist(PackageInfo packageInfo) {
        // Assignment logic: Package 1 -> Junior, Package 2 -> Senior
        String level = packageInfo.packageLevel == 1 ? "JUNIOR" : "SENIOR";
        
        // Predefined specialists based on requirements
        if ("Orthopaedics".equals(packageInfo.specialization)) {
            if ("JUNIOR".equals(level)) {
                return new SpecialistAssignment("Dr. Rajesh Kumar", "JUNIOR", "Orthopaedics",
                    "+91-9876543210", "rajesh.kumar@healthsync.com", "MBBS, MS Orthopaedics", 3);
            } else {
                return new SpecialistAssignment("Dr. Anil Gupta", "SENIOR", "Orthopaedics",
                    "+91-9876543212", "anil.gupta@healthsync.com", "MBBS, MS, MCh Orthopaedics", 15);
            }
        } else if ("Urology".equals(packageInfo.specialization)) {
            if ("JUNIOR".equals(level)) {
                return new SpecialistAssignment("Dr. Vikram Singh", "JUNIOR", "Urology",
                    "+91-9876543214", "vikram.singh@healthsync.com", "MBBS, MS Urology", 2);
            } else {
                return new SpecialistAssignment("Dr. Ashok Mehta", "SENIOR", "Urology",
                    "+91-9876543216", "ashok.mehta@healthsync.com", "MBBS, MS, MCh Urology", 20);
            }
        }
        
        throw new RuntimeException("No specialist available for specialization: " + packageInfo.specialization);
    }
    
    private TreatmentPlanResponse buildTreatmentPlanResponse(PatientDetail patient, TreatmentPlan plan,
                                                             PackageInfo packageInfo, SpecialistAssignment specialist) {
        TreatmentPlanResponse response = new TreatmentPlanResponse();
        response.setId(plan.getId());
        response.setStatus(plan.getStatus());
        
        // Patient information
        TreatmentPlanResponse.PatientInfo patientInfo = new TreatmentPlanResponse.PatientInfo(
            patient.getId(), patient.getName(), patient.getAge(), patient.getAilment(),
            patient.getContactNumber(), patient.getEmail(), patient.getAddress()
        );
        response.setPatient(patientInfo);
        
        // Package information
        TreatmentPlanResponse.PackageInfo pkgInfo = new TreatmentPlanResponse.PackageInfo(
            packageInfo.name, packageInfo.specialization, packageInfo.tests,
            packageInfo.cost, packageInfo.durationWeeks, packageInfo.packageLevel
        );
        response.setPackageDetails(pkgInfo);
        
        // Specialist information
        TreatmentPlanResponse.SpecialistInfo specialistInfo = new TreatmentPlanResponse.SpecialistInfo(
            specialist.name, specialist.level, specialist.specialization,
            specialist.contactNumber, specialist.email, specialist.qualification, specialist.experience
        );
        response.setAssignedSpecialist(specialistInfo);
        
        // Treatment schedule
        TreatmentPlanResponse.TreatmentSchedule schedule = new TreatmentPlanResponse.TreatmentSchedule(
            plan.getTreatmentStartDate(), plan.getTreatmentEndDate(),
            plan.getDurationWeeks(), plan.getStatus()
        );
        response.setSchedule(schedule);
        
        return response;
    }
    
    // Helper classes for internal use
    private static class PackageInfo {
        String name;
        String specialization;
        List<String> tests;
        Double cost;
        Integer durationWeeks;
        Integer packageLevel;
        
        PackageInfo(String name, String specialization, List<String> tests, Double cost, Integer durationWeeks, Integer packageLevel) {
            this.name = name;
            this.specialization = specialization;
            this.tests = tests;
            this.cost = cost;
            this.durationWeeks = durationWeeks;
            this.packageLevel = packageLevel;
        }
    }
    
    private static class SpecialistAssignment {
        String name;
        String level;
        String specialization;
        String contactNumber;
        String email;
        String qualification;
        Integer experience;
        
        SpecialistAssignment(String name, String level, String specialization, String contactNumber,
                             String email, String qualification, Integer experience) {
            this.name = name;
            this.level = level;
            this.specialization = specialization;
            this.contactNumber = contactNumber;
            this.email = email;
            this.qualification = qualification;
            this.experience = experience;
        }
    }
}