package com.hospital.config;

import com.hospital.insurance.entity.ClaimRequest;
import com.hospital.insurance.entity.Insurer;
import com.hospital.insurance.repository.ClaimRequestRepository;
import com.hospital.insurance.repository.InsurerRepository;
import com.hospital.treatment.offering.entity.Specialist;
import com.hospital.treatment.offering.entity.TreatmentPackage;
import com.hospital.treatment.offering.repository.SpecialistRepository;
import com.hospital.treatment.offering.repository.TreatmentPackageRepository;
import com.hospital.treatment.service.entity.PatientDetail;
import com.hospital.treatment.service.entity.TreatmentPlan;
import com.hospital.treatment.service.repository.PatientDetailRepository;
import com.hospital.treatment.service.repository.TreatmentPlanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    @Autowired
    private InsurerRepository insurerRepository;

    @Autowired
    private TreatmentPackageRepository treatmentPackageRepository;

    @Autowired
    private SpecialistRepository specialistRepository;

    @Autowired
    private PatientDetailRepository patientDetailRepository;

    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;

    @Autowired
    private ClaimRequestRepository claimRequestRepository;

    @Override
    public void run(String... args) throws Exception {
        if (insurerRepository.count() == 0) {
            logger.info("Loading sample data...");
            loadInsurers();
            loadTreatmentPackages();
            loadSpecialists();
            loadPatientDetails();
            loadTreatmentPlans();
            loadClaimRequests();
            logger.info("Sample data loaded successfully!");
        } else {
            logger.info("Sample data already exists, skipping initialization.");
        }
    }

    private void loadInsurers() {
        Insurer insurer1 = new Insurer("Apollo Munich Health Insurance", "Comprehensive Health Plus", 500000.0, 7);
        insurer1.setContactEmail("claims@apollomunich.com");
        insurerRepository.save(insurer1);
        
        Insurer insurer2 = new Insurer("Star Health Insurance", "Star Family Health Optima", 300000.0, 10);
        insurer2.setContactEmail("claims@starhealth.in");
        insurerRepository.save(insurer2);
        
        Insurer insurer3 = new Insurer("HDFC ERGO Health Insurance", "My Health Suraksha", 400000.0, 8);
        insurer3.setContactEmail("claims@hdfcergo.com");
        insurerRepository.save(insurer3);
        
        Insurer insurer4 = new Insurer("ICICI Lombard Health Insurance", "Complete Health Insurance", 600000.0, 12);
        insurer4.setContactEmail("claims@icicilombard.com");
        insurerRepository.save(insurer4);
        
        Insurer insurer5 = new Insurer("Max Bupa Health Insurance", "Health Companion", 250000.0, 9);
        insurer5.setContactEmail("claims@maxbupa.com");
        insurerRepository.save(insurer5);
        
        Insurer insurer6 = new Insurer("Care Health Insurance", "Care Supreme", 350000.0, 11);
        insurer6.setContactEmail("claims@careinsurance.com");
        insurerRepository.save(insurer6);
        
        Insurer insurer7 = new Insurer("SBI General Insurance", "Arogya Premier", 200000.0, 14);
        insurer7.setContactEmail("claims@sbigeneral.in");
        insurerRepository.save(insurer7);
        
        Insurer insurer8 = new Insurer("Bajaj Allianz Health", "Health Guard", 450000.0, 10);
        insurer8.setContactEmail("claims@bajajallianz.com");
        insurerRepository.save(insurer8);
        
        Insurer insurer9 = new Insurer("Oriental Insurance Company", "Hope Health Insurance", 180000.0, 15);
        insurer9.setContactEmail("claims@orientalinsurance.co.in");
        insurerRepository.save(insurer9);
        
        Insurer insurer10 = new Insurer("United India Insurance", "Family Floater Mediclaim", 300000.0, 13);
        insurer10.setContactEmail("claims@uiic.co.in");
        insurerRepository.save(insurer10);
    }

    private void loadTreatmentPackages() {
        treatmentPackageRepository.save(new TreatmentPackage("Orthopaedics Package 1", "Orthopaedics", Arrays.asList("OPT1", "OPT2", "OPT3"), 2500.0, 4, 1));
        treatmentPackageRepository.save(new TreatmentPackage("Orthopaedics Package 2", "Orthopaedics", Arrays.asList("OPT4", "OPT5", "OPT6"), 3000.0, 6, 2));
        treatmentPackageRepository.save(new TreatmentPackage("Urology Package 1", "Urology", Arrays.asList("URT1", "URT2", "URT3"), 4000.0, 4, 1));
        treatmentPackageRepository.save(new TreatmentPackage("Urology Package 2", "Urology", Arrays.asList("URT4", "URT5", "URT6"), 5000.0, 6, 2));
    }

    private void loadSpecialists() {
        specialistRepository.save(new Specialist("Dr. Sarah Johnson", "Orthopaedics", "SENIOR", "MBBS, MS (Ortho)", 15, "+1-555-0101", "dr.sarah@hospital.com"));
        specialistRepository.save(new Specialist("Dr. Michael Chen", "Orthopaedics", "JUNIOR", "MBBS, MS (Ortho)", 8, "+1-555-0102", "dr.michael@hospital.com"));
        specialistRepository.save(new Specialist("Dr. Emily Rodriguez", "Orthopaedics", "SENIOR", "MBBS, MS (Ortho)", 12, "+1-555-0103", "dr.emily@hospital.com"));
        specialistRepository.save(new Specialist("Dr. James Wilson", "Orthopaedics", "JUNIOR", "MBBS, MS (Ortho)", 6, "+1-555-0104", "dr.james@hospital.com"));
        specialistRepository.save(new Specialist("Dr. Lisa Thompson", "Urology", "SENIOR", "MBBS, MS (Urology)", 18, "+1-555-0201", "dr.lisa@hospital.com"));
        specialistRepository.save(new Specialist("Dr. David Kumar", "Urology", "JUNIOR", "MBBS, MS (Urology)", 7, "+1-555-0202", "dr.david@hospital.com"));
        specialistRepository.save(new Specialist("Dr. Maria Garcia", "Urology", "SENIOR", "MBBS, MS (Urology)", 14, "+1-555-0203", "dr.maria@hospital.com"));
        specialistRepository.save(new Specialist("Dr. Robert Lee", "Urology", "JUNIOR", "MBBS, MS (Urology)", 5, "+1-555-0204", "dr.robert@hospital.com"));
    }

    private void loadPatientDetails() {
        PatientDetail patient1 = new PatientDetail("John Smith", 45, "Knee Pain", "Orthopaedics Package 1", LocalDate.parse("2024-01-15"));
        patient1.setContactNumber("+1-555-1001");
        patient1.setInsuranceProvider("Apollo Munich Health Insurance");
        patientDetailRepository.save(patient1);
        
        PatientDetail patient2 = new PatientDetail("Jane Doe", 38, "Kidney Stones", "Urology Package 1", LocalDate.parse("2024-01-20"));
        patient2.setContactNumber("+1-555-1002");
        patient2.setInsuranceProvider("HDFC ERGO Health Insurance");
        patientDetailRepository.save(patient2);
        
        PatientDetail patient3 = new PatientDetail("Robert Brown", 52, "Back Pain", "Orthopaedics Package 2", LocalDate.parse("2024-02-01"));
        patient3.setContactNumber("+1-555-1003");
        patient3.setInsuranceProvider("Star Health Insurance");
        patientDetailRepository.save(patient3);
        
        PatientDetail patient4 = new PatientDetail("Emily Davis", 29, "Urinary Infection", "Urology Package 2", LocalDate.parse("2024-02-10"));
        patient4.setContactNumber("+1-555-1004");
        patient4.setInsuranceProvider("ICICI Lombard Health Insurance");
        patientDetailRepository.save(patient4);
        
        PatientDetail patient5 = new PatientDetail("Michael Wilson", 41, "Joint Issues", "Orthopaedics Package 1", LocalDate.parse("2024-02-15"));
        patient5.setContactNumber("+1-555-1005");
        patient5.setInsuranceProvider("Apollo Munich Health Insurance");
        patientDetailRepository.save(patient5);
        
        PatientDetail patient6 = new PatientDetail("Sarah Miller", 35, "Bladder Issues", "Urology Package 1", LocalDate.parse("2024-03-01"));
        patient6.setContactNumber("+1-555-1006");
        patient6.setInsuranceProvider("HDFC ERGO Health Insurance");
        patientDetailRepository.save(patient6);
    }

    private void loadTreatmentPlans() {
        treatmentPlanRepository.save(new TreatmentPlan(1L, "Orthopaedics Package 1", Arrays.asList("X-Ray", "MRI", "Blood Test"), 2500.0, "Dr. Michael Chen", "JUNIOR", "Orthopaedics", LocalDate.parse("2024-01-15"), LocalDate.parse("2024-02-12"), 4));
        treatmentPlanRepository.save(new TreatmentPlan(2L, "Urology Package 1", Arrays.asList("Ultrasound", "CT Scan", "Urine Test"), 4000.0, "Dr. David Kumar", "JUNIOR", "Urology", LocalDate.parse("2024-01-20"), LocalDate.parse("2024-02-17"), 4));
        treatmentPlanRepository.save(new TreatmentPlan(3L, "Orthopaedics Package 2", Arrays.asList("MRI", "CT Scan", "Physical Therapy"), 3000.0, "Dr. Sarah Johnson", "SENIOR", "Orthopaedics", LocalDate.parse("2024-02-01"), LocalDate.parse("2024-03-14"), 6));
        treatmentPlanRepository.save(new TreatmentPlan(4L, "Urology Package 2", Arrays.asList("Cystoscopy", "Biopsy", "Blood Test"), 5000.0, "Dr. Lisa Thompson", "SENIOR", "Urology", LocalDate.parse("2024-02-10"), LocalDate.parse("2024-03-23"), 6));
        treatmentPlanRepository.save(new TreatmentPlan(5L, "Orthopaedics Package 1", Arrays.asList("X-Ray", "Physical Therapy", "Blood Test"), 2500.0, "Dr. James Wilson", "JUNIOR", "Orthopaedics", LocalDate.parse("2024-02-15"), LocalDate.parse("2024-03-14"), 4));
        treatmentPlanRepository.save(new TreatmentPlan(6L, "Urology Package 1", Arrays.asList("Ultrasound", "Urine Test", "Blood Test"), 4000.0, "Dr. Robert Lee", "JUNIOR", "Urology", LocalDate.parse("2024-03-01"), LocalDate.parse("2024-03-29"), 4));
    }

    private void loadClaimRequests() {
        ClaimRequest claim1 = new ClaimRequest("John Smith", "Knee Pain", "Orthopaedics Package 1", 2500.0, "Apollo Munich Health Insurance", "Comprehensive Health Plus", 500000.0, 2250.0);
        claim1.setClaimStatus("APPROVED");
        claim1.setClaimReferenceNumber("CLM-2024-10001");
        claim1.setPatientId(1L);
        claim1.setClaimInitiatedDate(LocalDateTime.parse("2024-01-15T10:00:00"));
        claimRequestRepository.save(claim1);
        
        ClaimRequest claim2 = new ClaimRequest("Jane Doe", "Kidney Stones", "Urology Package 1", 4000.0, "HDFC ERGO Health Insurance", "My Health Suraksha", 400000.0, 3600.0);
        claim2.setClaimStatus("PROCESSING");
        claim2.setClaimReferenceNumber("CLM-2024-10002");
        claim2.setPatientId(2L);
        claim2.setClaimInitiatedDate(LocalDateTime.parse("2024-01-20T14:30:00"));
        claimRequestRepository.save(claim2);
        
        ClaimRequest claim3 = new ClaimRequest("Robert Brown", "Back Pain", "Orthopaedics Package 2", 3000.0, "Star Health Insurance", "Star Family Health Optima", 300000.0, 2700.0);
        claim3.setClaimStatus("INITIATED");
        claim3.setClaimReferenceNumber("CLM-2024-10003");
        claim3.setPatientId(3L);
        claim3.setClaimInitiatedDate(LocalDateTime.parse("2024-02-01T09:15:00"));
        claimRequestRepository.save(claim3);
        
        ClaimRequest claim4 = new ClaimRequest("Emily Davis", "Urinary Infection", "Urology Package 2", 5000.0, "ICICI Lombard Health Insurance", "Complete Health Insurance", 600000.0, 4500.0);
        claim4.setClaimStatus("APPROVED");
        claim4.setClaimReferenceNumber("CLM-2024-10004");
        claim4.setPatientId(4L);
        claim4.setClaimInitiatedDate(LocalDateTime.parse("2024-02-10T16:45:00"));
        claimRequestRepository.save(claim4);
    }
}