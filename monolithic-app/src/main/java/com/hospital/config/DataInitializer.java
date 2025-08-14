package com.hospital.config;

import com.hospital.insurance.entity.Insurer;
import com.hospital.insurance.repository.InsurerRepository;
import com.hospital.treatment.offering.entity.Specialist;
import com.hospital.treatment.offering.entity.TreatmentPackage;
import com.hospital.treatment.offering.repository.SpecialistRepository;
import com.hospital.treatment.offering.repository.TreatmentPackageRepository;
import com.hospital.treatment.service.entity.PatientDetail;
import com.hospital.treatment.service.entity.TreatmentPlan;
import com.hospital.treatment.service.repository.PatientDetailRepository;
import com.hospital.treatment.service.repository.TreatmentPlanRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer {
    
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    @Autowired
    private InsurerRepository insurerRepository;
    
    @Autowired
    private TreatmentPackageRepository packageRepository;
    
    @Autowired
    private SpecialistRepository specialistRepository;
    
    @Autowired
    private PatientDetailRepository patientDetailRepository;
    
    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;
    
    @PostConstruct
    public void initializeData() {
        logger.info("=== Hospital Management System Data Initialization ===");
        
        initializeInsurers();
        initializeTreatmentPackages();
        initializeSpecialists();
        initializePatientDetails();
        initializeTreatmentPlans();
        
        logger.info("=== Data Initialization Complete ===");
        logger.info("Insurers: {}", insurerRepository.count());
        logger.info("Treatment Packages: {}", packageRepository.count());
        logger.info("Specialists: {}", specialistRepository.count());
        logger.info("Patient Details: {}", patientDetailRepository.count());
        logger.info("Treatment Plans: {}", treatmentPlanRepository.count());
    }
    
    private void initializeInsurers() {
        if (insurerRepository.count() == 0) {
            logger.info("Initializing insurance providers...");
            List<Insurer> insurers = Arrays.asList(
                createInsurer("Apollo Munich Health Insurance", "Orthopaedics Basic", 2000.0, 7,
                    "claims@apollomunich.com", "+91-1800-116-969", "Mumbai, Maharashtra", "www.apollomunichinsurance.com"),
                
                createInsurer("Star Health Insurance", "Orthopaedics Premium", 3500.0, 10,
                    "claims@starhealth.in", "+91-1800-425-2255", "Chennai, Tamil Nadu", "www.starhealth.in"),
                
                createInsurer("HDFC ERGO Health", "Ortho Care Plus", 2800.0, 5,
                    "claims@hdfcergo.com", "+91-1800-266-9966", "Mumbai, Maharashtra", "www.hdfcergo.com"),
                
                createInsurer("ICICI Lombard Health", "Urology Specialty", 4500.0, 7,
                    "claims@icicilombard.com", "+91-1800-266-7766", "Mumbai, Maharashtra", "www.icicilombard.com"),
                
                createInsurer("Max Bupa Health", "Urology Complete Care", 5500.0, 12,
                    "claims@maxbupa.com", "+91-1800-103-3911", "New Delhi, Delhi", "www.maxbupa.com"),
                
                createInsurer("Bajaj Allianz Health", "Urology Advanced", 4200.0, 8,
                    "claims@bajajallianz.co.in", "+91-1800-209-0144", "Pune, Maharashtra", "www.bajajallianz.co.in"),
                
                createInsurer("LIC Health Insurance", "Medical Comprehensive", 6000.0, 15,
                    "claims@licindia.com", "+91-022-6827-6827", "Mumbai, Maharashtra", "www.licindia.in"),
                
                createInsurer("Oriental Insurance", "Family Health Plus", 3000.0, 10,
                    "claims@orientalinsurance.co.in", "+91-1800-118-485", "New Delhi, Delhi", "www.orientalinsurance.co.in"),
                
                createInsurer("National Insurance", "Mediclaim Premium", 4000.0, 12,
                    "claims@nationalinsurance.nic.co.in", "+91-1800-200-7710", "Kolkata, West Bengal", "www.nationalinsuranceindia.nic.co.in"),
                
                createInsurer("United India Insurance", "Health Guardian", 3200.0, 9,
                    "claims@uiic.co.in", "+91-044-2829-2929", "Chennai, Tamil Nadu", "www.uiic.co.in")
            );
            
            insurerRepository.saveAll(insurers);
        }
    }
    
    private void initializeTreatmentPackages() {
        if (packageRepository.count() == 0) {
            logger.info("Initializing treatment packages...");
            TreatmentPackage orthoPkg1 = new TreatmentPackage(
                "Orthopaedics Package 1",
                "Orthopaedics",
                Arrays.asList("OPT1", "OPT2"),
                2500.0,
                4,
                1
            );
            
            TreatmentPackage orthoPkg2 = new TreatmentPackage(
                "Orthopaedics Package 2",
                "Orthopaedics",
                Arrays.asList("OPT3", "OPT4"),
                3000.0,
                6,
                2
            );
            
            TreatmentPackage urologyPkg1 = new TreatmentPackage(
                "Urology Package 1",
                "Urology",
                Arrays.asList("UPT1", "UPT2"),
                4000.0,
                4,
                1
            );
            
            TreatmentPackage urologyPkg2 = new TreatmentPackage(
                "Urology Package 2",
                "Urology",
                Arrays.asList("UPT3", "UPT4"),
                5000.0,
                6,
                2
            );
            
            packageRepository.saveAll(Arrays.asList(orthoPkg1, orthoPkg2, urologyPkg1, urologyPkg2));
        }
    }
    
    private void initializeSpecialists() {
        if (specialistRepository.count() == 0) {
            logger.info("Initializing specialists...");
            List<Specialist> specialists = Arrays.asList(
                new Specialist("Dr. Rajesh Kumar", "Orthopaedics", "JUNIOR", "MBBS, MS Orthopaedics", 3, "+91-9876543210", "rajesh.kumar@mediflow.com"),
                new Specialist("Dr. Priya Sharma", "Orthopaedics", "JUNIOR", "MBBS, DNB Orthopaedics", 4, "+91-9876543211", "priya.sharma@mediflow.com"),
                new Specialist("Dr. Anil Gupta", "Orthopaedics", "SENIOR", "MBBS, MS, MCh Orthopaedics", 15, "+91-9876543212", "anil.gupta@mediflow.com"),
                new Specialist("Dr. Sunita Rao", "Orthopaedics", "SENIOR", "MBBS, MS, Fellowship Joint Replacement", 18, "+91-9876543213", "sunita.rao@mediflow.com"),
                new Specialist("Dr. Vikram Singh", "Urology", "JUNIOR", "MBBS, MS Urology", 2, "+91-9876543214", "vikram.singh@mediflow.com"),
                new Specialist("Dr. Neha Jain", "Urology", "JUNIOR", "MBBS, DNB Urology", 3, "+91-9876543215", "neha.jain@mediflow.com"),
                new Specialist("Dr. Ashok Mehta", "Urology", "SENIOR", "MBBS, MS, MCh Urology", 20, "+91-9876543216", "ashok.mehta@mediflow.com"),
                new Specialist("Dr. Kavita Verma", "Urology", "SENIOR", "MBBS, MS, Fellowship Uro-Oncology", 16, "+91-9876543217", "kavita.verma@mediflow.com")
            );
            
            specialistRepository.saveAll(specialists);
        }
    }
    
    private void initializePatientDetails() {
        if (patientDetailRepository.count() == 0) {
            logger.info("Initializing patient details...");
            List<PatientDetail> patients = Arrays.asList(
                createPatient("Amit Sharma", 45, "Knee joint pain and stiffness", "Orthopaedics Package 1", 
                    LocalDate.now().minusDays(10), "+91-9876543220", "amit.sharma@gmail.com", 
                    "123 MG Road, Bangalore", "Star Health Insurance"),
                
                createPatient("Priya Patel", 38, "Lower back pain and disc problems", "Orthopaedics Package 2", 
                    LocalDate.now().minusDays(15), "+91-9876543221", "priya.patel@gmail.com", 
                    "456 Park Street, Mumbai", "HDFC ERGO Health"),
                
                createPatient("Rajesh Kumar", 52, "Kidney stones and urinary issues", "Urology Package 1", 
                    LocalDate.now().minusDays(8), "+91-9876543222", "rajesh.kumar@gmail.com", 
                    "789 Anna Salai, Chennai", "ICICI Lombard Health"),
                
                createPatient("Sunita Singh", 41, "Bladder infection and related complications", "Urology Package 2", 
                    LocalDate.now().minusDays(12), "+91-9876543223", "sunita.singh@gmail.com", 
                    "321 CP Road, Delhi", "Max Bupa Health"),
                
                createPatient("Vikram Rao", 48, "Hip replacement surgery required", "Orthopaedics Package 2", 
                    LocalDate.now().minusDays(5), "+91-9876543224", "vikram.rao@gmail.com", 
                    "654 Brigade Road, Bangalore", "Apollo Munich Health Insurance"),
                
                createPatient("Neha Gupta", 35, "Prostate treatment and monitoring", "Urology Package 1", 
                    LocalDate.now().minusDays(18), "+91-9876543225", "neha.gupta@gmail.com", 
                    "987 Linking Road, Mumbai", "Bajaj Allianz Health")
            );
            
            patientDetailRepository.saveAll(patients);
        }
    }
    
    private void initializeTreatmentPlans() {
        if (treatmentPlanRepository.count() == 0) {
            logger.info("Initializing treatment plans...");
            List<TreatmentPlan> treatmentPlans = Arrays.asList(
                createTreatmentPlan(1L, "Orthopaedics Package 1", Arrays.asList("X-Ray", "MRI Scan"), 
                    2500.0, "Dr. Rajesh Kumar", "JUNIOR", "Orthopaedics", 
                    LocalDate.now().minusDays(10), LocalDate.now().plusDays(18), 4,
                    "+91-9876543210", "rajesh.kumar@mediflow.com"),
                
                createTreatmentPlan(2L, "Orthopaedics Package 2", Arrays.asList("CT Scan", "Blood Test"), 
                    3000.0, "Dr. Anil Gupta", "SENIOR", "Orthopaedics", 
                    LocalDate.now().minusDays(15), LocalDate.now().plusDays(27), 6,
                    "+91-9876543212", "anil.gupta@mediflow.com"),
                
                createTreatmentPlan(3L, "Urology Package 1", Arrays.asList("Ultrasound", "Urine Test"), 
                    4000.0, "Dr. Vikram Singh", "JUNIOR", "Urology", 
                    LocalDate.now().minusDays(8), LocalDate.now().plusDays(20), 4,
                    "+91-9876543214", "vikram.singh@mediflow.com"),
                
                createTreatmentPlan(4L, "Urology Package 2", Arrays.asList("Cystoscopy", "PSA Test"), 
                    5000.0, "Dr. Ashok Mehta", "SENIOR", "Urology", 
                    LocalDate.now().minusDays(12), LocalDate.now().plusDays(30), 6,
                    "+91-9876543216", "ashok.mehta@mediflow.com"),
                
                createTreatmentPlan(5L, "Orthopaedics Package 2", Arrays.asList("Pre-op Tests", "Post-op Care"), 
                    3000.0, "Dr. Sunita Rao", "SENIOR", "Orthopaedics", 
                    LocalDate.now().minusDays(5), LocalDate.now().plusDays(37), 6,
                    "+91-9876543213", "sunita.rao@mediflow.com"),
                
                createTreatmentPlan(6L, "Urology Package 1", Arrays.asList("Kidney Function Test", "Imaging"), 
                    4000.0, "Dr. Neha Jain", "JUNIOR", "Urology", 
                    LocalDate.now().minusDays(18), LocalDate.now().plusDays(10), 4,
                    "+91-9876543215", "neha.jain@mediflow.com")
            );
            
            treatmentPlanRepository.saveAll(treatmentPlans);
        }
    }
    
    private Insurer createInsurer(String insurerName, String packageName, Double amountLimit, Integer disbursementDays,
                                  String email, String phone, String address, String website) {
        Insurer insurer = new Insurer(insurerName, packageName, amountLimit, disbursementDays);
        insurer.setContactEmail(email);
        insurer.setContactPhone(phone);
        insurer.setAddress(address);
        insurer.setWebsite(website);
        insurer.setActive(true);
        return insurer;
    }
    
    private PatientDetail createPatient(String name, Integer age, String ailment, String packageName, 
                                       LocalDate startDate, String phone, String email, String address, String insurance) {
        PatientDetail patient = new PatientDetail(name, age, ailment, packageName, startDate);
        patient.setTreatmentEndDate(startDate.plusWeeks(packageName.contains("Package 1") ? 4 : 6));
        patient.setContactNumber(phone);
        patient.setEmail(email);
        patient.setAddress(address);
        patient.setInsuranceProvider(insurance);
        return patient;
    }
    
    private TreatmentPlan createTreatmentPlan(Long patientId, String packageName, List<String> tests, 
                                            Double cost, String specialistName, String specialistLevel, String specialization,
                                            LocalDate startDate, LocalDate endDate, Integer durationWeeks,
                                            String specialistPhone, String specialistEmail) {
        TreatmentPlan plan = new TreatmentPlan(patientId, packageName, tests, cost, specialistName, 
            specialistLevel, specialization, startDate, endDate, durationWeeks);
        plan.setSpecialistContactNumber(specialistPhone);
        plan.setSpecialistEmail(specialistEmail);
        return plan;
    }
}