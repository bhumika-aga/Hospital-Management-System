-- HealthSync Hospital Management System - Sample Data
-- This file contains sample data for the application

-- Insurance Providers Data
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (1, 'Apollo Munich Health Insurance', 'Comprehensive Health Plus', 500000.0, 7, 'claims@apollomunich.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (2, 'Star Health Insurance', 'Star Family Health Optima', 300000.0, 10, 'claims@starhealth.in', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (3, 'HDFC ERGO Health Insurance', 'My Health Suraksha', 400000.0, 8, 'claims@hdfcergo.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (4, 'ICICI Lombard Health Insurance', 'Complete Health Insurance', 600000.0, 12, 'claims@icicilombard.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (5, 'Max Bupa Health Insurance', 'Health Companion', 250000.0, 9, 'claims@maxbupa.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (6, 'Care Health Insurance', 'Care Supreme', 350000.0, 11, 'claims@careinsurance.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (7, 'SBI General Insurance', 'Arogya Premier', 200000.0, 14, 'claims@sbigeneral.in', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (8, 'Bajaj Allianz Health', 'Health Guard', 450000.0, 10, 'claims@bajajallianz.com', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (9, 'Oriental Insurance Company', 'Hope Health Insurance', 180000.0, 15, 'claims@orientalinsurance.co.in', true);
INSERT INTO insurer (id, insurer_name, package_name, amount_limit, disbursement_days, contact_email, active) VALUES (10, 'United India Insurance', 'Family Floater Mediclaim', 300000.0, 13, 'claims@uiic.co.in', true);

-- Treatment Packages Data
INSERT INTO treatment_package (id, package_name, specialization, test_list, package_cost, duration_weeks, package_tier) VALUES (1, 'Orthopaedics Package 1', 'Orthopaedics', 'OPT1,OPT2,OPT3', 2500.0, 4, 1);
INSERT INTO treatment_package (id, package_name, specialization, test_list, package_cost, duration_weeks, package_tier) VALUES (2, 'Orthopaedics Package 2', 'Orthopaedics', 'OPT4,OPT5,OPT6', 3000.0, 6, 2);
INSERT INTO treatment_package (id, package_name, specialization, test_list, package_cost, duration_weeks, package_tier) VALUES (3, 'Urology Package 1', 'Urology', 'URT1,URT2,URT3', 4000.0, 4, 1);
INSERT INTO treatment_package (id, package_name, specialization, test_list, package_cost, duration_weeks, package_tier) VALUES (4, 'Urology Package 2', 'Urology', 'URT4,URT5,URT6', 5000.0, 6, 2);

-- Specialists Data
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (1, 'Dr. Sarah Johnson', 'Orthopaedics', 'MBBS, MS (Ortho)', '15 years', 2, 'dr.sarah@hospital.com', '+1-555-0101');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (2, 'Dr. Michael Chen', 'Orthopaedics', 'MBBS, MS (Ortho)', '8 years', 1, 'dr.michael@hospital.com', '+1-555-0102');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (3, 'Dr. Emily Rodriguez', 'Orthopaedics', 'MBBS, MS (Ortho)', '12 years', 2, 'dr.emily@hospital.com', '+1-555-0103');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (4, 'Dr. James Wilson', 'Orthopaedics', 'MBBS, MS (Ortho)', '6 years', 1, 'dr.james@hospital.com', '+1-555-0104');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (5, 'Dr. Lisa Thompson', 'Urology', 'MBBS, MS (Urology)', '18 years', 2, 'dr.lisa@hospital.com', '+1-555-0201');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (6, 'Dr. David Kumar', 'Urology', 'MBBS, MS (Urology)', '7 years', 1, 'dr.david@hospital.com', '+1-555-0202');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (7, 'Dr. Maria Garcia', 'Urology', 'MBBS, MS (Urology)', '14 years', 2, 'dr.maria@hospital.com', '+1-555-0203');
INSERT INTO specialist (id, name, specialization, qualification, experience, tier, contact_email, contact_phone) VALUES (8, 'Dr. Robert Lee', 'Urology', 'MBBS, MS (Urology)', '5 years', 1, 'dr.robert@hospital.com', '+1-555-0204');

-- Patient Details Data
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (1, 'John Smith', '+1-555-1001', 1, '2024-01-15');
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (2, 'Jane Doe', '+1-555-1002', 3, '2024-01-20');
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (3, 'Robert Brown', '+1-555-1003', 2, '2024-02-01');
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (4, 'Emily Davis', '+1-555-1004', 4, '2024-02-10');
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (5, 'Michael Wilson', '+1-555-1005', 1, '2024-02-15');
INSERT INTO patient_detail (id, patient_name, contact_number, package_id, preferred_start_date) VALUES (6, 'Sarah Miller', '+1-555-1006', 3, '2024-03-01');

-- Treatment Plans Data
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (1, 1, 'Dr. Michael Chen', '4-week Orthopaedics rehabilitation program', '2024-01-15', '2024-02-12');
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (2, 2, 'Dr. David Kumar', '4-week Urology treatment program', '2024-01-20', '2024-02-17');
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (3, 3, 'Dr. Sarah Johnson', '6-week Advanced Orthopaedics program', '2024-02-01', '2024-03-14');
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (4, 4, 'Dr. Lisa Thompson', '6-week Comprehensive Urology program', '2024-02-10', '2024-03-23');
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (5, 5, 'Dr. James Wilson', '4-week Orthopaedics rehabilitation program', '2024-02-15', '2024-03-14');
INSERT INTO treatment_plan (id, patient_detail_id, assigned_specialist, treatment_plan, start_date, end_date) VALUES (6, 6, 'Dr. Robert Lee', '4-week Urology treatment program', '2024-03-01', '2024-03-29');

-- Claim Requests Data
INSERT INTO claim_request (id, patient_name, treatment_cost, insurer_id, treatment_details, claim_id, status, estimated_amount, processing_time, message, claim_date) VALUES (1, 'John Smith', 2500.0, 1, 'Orthopaedics Package 1 - Knee rehabilitation', 10001, 'APPROVED', 2250.0, '7-10 days', 'Claim approved successfully. Reference ID: CLM-2024-10001', '2024-01-15');
INSERT INTO claim_request (id, patient_name, treatment_cost, insurer_id, treatment_details, claim_id, status, estimated_amount, processing_time, message, claim_date) VALUES (2, 'Jane Doe', 4000.0, 3, 'Urology Package 1 - Kidney stone treatment', 10002, 'PROCESSING', 3600.0, '8-12 days', 'Claim under review. Reference ID: CLM-2024-10002', '2024-01-20');
INSERT INTO claim_request (id, patient_name, treatment_cost, insurer_id, treatment_details, claim_id, status, estimated_amount, processing_time, message, claim_date) VALUES (3, 'Robert Brown', 3000.0, 2, 'Orthopaedics Package 2 - Spinal therapy', 10003, 'INITIATED', 2700.0, '10-15 days', 'Claim initiated successfully. Reference ID: CLM-2024-10003', '2024-02-01');
INSERT INTO claim_request (id, patient_name, treatment_cost, insurer_id, treatment_details, claim_id, status, estimated_amount, processing_time, message, claim_date) VALUES (4, 'Emily Davis', 5000.0, 4, 'Urology Package 2 - Comprehensive urological care', 10004, 'APPROVED', 4500.0, '12-15 days', 'Claim approved successfully. Reference ID: CLM-2024-10004', '2024-02-10');

-- Note: Sequence updates are handled automatically by Hibernate
-- This ensures compatibility with both H2 (development) and PostgreSQL (production)