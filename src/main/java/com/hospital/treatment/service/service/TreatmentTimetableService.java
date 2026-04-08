package com.hospital.treatment.service.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.treatment.offering.entity.Specialist;
import com.hospital.treatment.offering.entity.TreatmentPackage;
import com.hospital.treatment.offering.repository.SpecialistRepository;
import com.hospital.treatment.offering.repository.TreatmentPackageRepository;
import com.hospital.treatment.service.dto.PatientDetailRequest;
import com.hospital.treatment.service.dto.TreatmentPlanResponse;
import com.hospital.treatment.service.entity.PatientDetail;
import com.hospital.treatment.service.entity.TreatmentPlan;
import com.hospital.treatment.service.repository.PatientDetailRepository;
import com.hospital.treatment.service.repository.TreatmentPlanRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TreatmentTimetableService {

        private final PatientDetailRepository patientRepository;
        private final TreatmentPlanRepository treatmentPlanRepository;
        private final TreatmentPackageRepository packageRepository;
        private final SpecialistRepository specialistRepository;

        public TreatmentPlanResponse formulateTreatmentTimetable(PatientDetailRequest request) {
                // Find the treatment package from database
                TreatmentPackage treatmentPackage = packageRepository.findByName(request.getPackageName())
                                .orElseThrow(() -> new RuntimeException(
                                                "Treatment package not found: " + request.getPackageName()));

                // Determine specialist level based on package level
                String requiredLevel = treatmentPackage.getPackageLevel() == 1 ? "JUNIOR" : "SENIOR";

                // Find an available specialist
                Specialist specialist = specialistRepository
                                .findBySpecializationAndLevel(treatmentPackage.getSpecialization(), requiredLevel)
                                .stream()
                                .filter(Specialist::getAvailable)
                                .findFirst()
                                .orElseThrow(() -> new RuntimeException("No available specialist found for "
                                                + treatmentPackage.getSpecialization() + " at " + requiredLevel
                                                + " level"));

                // Save patient details
                PatientDetail patient = new PatientDetail(request.getName(), request.getAge(), request.getAilment(),
                                treatmentPackage.getName(), request.getTreatmentStartDate());
                patient.setContactNumber(request.getContactNumber());
                patient.setEmail(request.getEmail());
                patient.setAddress(request.getAddress());

                PatientDetail savedPatient = patientRepository.save(patient);

                // Calculate treatment end date
                LocalDate endDate = request.getTreatmentStartDate().plusWeeks(treatmentPackage.getDurationWeeks());
                savedPatient.setTreatmentEndDate(endDate);
                patientRepository.save(savedPatient);

                // Create treatment plan
                TreatmentPlan treatmentPlan = new TreatmentPlan(
                                savedPatient.getId(),
                                treatmentPackage.getName(),
                                new java.util.ArrayList<>(treatmentPackage.getTests()),
                                treatmentPackage.getCost(),
                                specialist.getName(),
                                specialist.getLevel(),
                                treatmentPackage.getSpecialization(),
                                request.getTreatmentStartDate(),
                                endDate,
                                treatmentPackage.getDurationWeeks());

                treatmentPlan.setSpecialistContactNumber(specialist.getContactNumber());
                treatmentPlan.setSpecialistEmail(specialist.getEmail());

                TreatmentPlan savedPlan = treatmentPlanRepository.save(treatmentPlan);

                // Build comprehensive response
                return buildTreatmentPlanResponse(savedPatient, savedPlan, treatmentPackage, specialist);
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
                                .orElseThrow(() -> new RuntimeException(
                                                "Treatment plan not found for patient: " + patientId));

                TreatmentPackage treatmentPackage = packageRepository.findByName(patient.getTreatmentPackageName())
                                .orElseThrow(() -> new RuntimeException(
                                                "Package not found: " + patient.getTreatmentPackageName()));

                // In a real scenario, we might want to store more specialist details in the
                // plan or link it
                // For now, we use the details stored in the TreatmentPlan entity
                return buildTreatmentPlanFromStoredData(patient, plan, treatmentPackage);
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

        private TreatmentPlanResponse buildTreatmentPlanResponse(PatientDetail patient, TreatmentPlan plan,
                        TreatmentPackage pkg, Specialist specialist) {
                TreatmentPlanResponse response = new TreatmentPlanResponse();
                response.setId(plan.getId());
                response.setStatus(plan.getStatus());

                // Patient information
                TreatmentPlanResponse.PatientInfo patientInfo = new TreatmentPlanResponse.PatientInfo(
                                patient.getId(),
                                patient.getName(),
                                patient.getAge(),
                                patient.getAilment(),
                                patient.getContactNumber(),
                                patient.getEmail(),
                                patient.getAddress());
                response.setPatient(patientInfo);

                // Package information
                TreatmentPlanResponse.PackageInfo pkgInfo = new TreatmentPlanResponse.PackageInfo(
                                pkg.getName(),
                                pkg.getSpecialization(),
                                pkg.getTests(),
                                pkg.getCost(),
                                pkg.getDurationWeeks(),
                                pkg.getPackageLevel());
                response.setPackageDetails(pkgInfo);

                // Specialist information
                TreatmentPlanResponse.SpecialistInfo specialistInfo = new TreatmentPlanResponse.SpecialistInfo(
                                specialist.getName(),
                                specialist.getLevel(),
                                specialist.getSpecialization(),
                                specialist.getContactNumber(),
                                specialist.getEmail(),
                                specialist.getQualification(),
                                specialist.getExperience());
                response.setAssignedSpecialist(specialistInfo);

                // Treatment schedule
                TreatmentPlanResponse.TreatmentSchedule schedule = new TreatmentPlanResponse.TreatmentSchedule(
                                plan.getTreatmentStartDate(),
                                plan.getTreatmentEndDate(),
                                plan.getDurationWeeks(),
                                plan.getStatus());
                response.setSchedule(schedule);

                return response;
        }

        private TreatmentPlanResponse buildTreatmentPlanFromStoredData(PatientDetail patient, TreatmentPlan plan,
                        TreatmentPackage pkg) {
                TreatmentPlanResponse response = new TreatmentPlanResponse();
                response.setId(plan.getId());
                response.setStatus(plan.getStatus());

                // Patient info
                response.setPatient(new TreatmentPlanResponse.PatientInfo(
                                patient.getId(), patient.getName(), patient.getAge(), patient.getAilment(),
                                patient.getContactNumber(), patient.getEmail(), patient.getAddress()));

                // Package info
                response.setPackageDetails(new TreatmentPlanResponse.PackageInfo(
                                pkg.getName(), pkg.getSpecialization(), pkg.getTests(), pkg.getCost(),
                                pkg.getDurationWeeks(), pkg.getPackageLevel()));

                // Specialist info (from plan)
                response.setAssignedSpecialist(new TreatmentPlanResponse.SpecialistInfo(
                                plan.getSpecialistName(), plan.getSpecialistLevel(), plan.getSpecialization(),
                                plan.getSpecialistContactNumber(), plan.getSpecialistEmail(),
                                "Verified Specialist", 10)); // Placeholder for values not fully stored in plan

                // Schedule
                response.setSchedule(new TreatmentPlanResponse.TreatmentSchedule(
                                plan.getTreatmentStartDate(), plan.getTreatmentEndDate(), plan.getDurationWeeks(),
                                plan.getStatus()));

                return response;
        }
}