-- Hospital Management System - Sample Data Initialization
-- This file initializes the database with sample data for development and testing

-- Insert Insurers
INSERT INTO insurers (insurer_name, package_name, insurance_amount_limit, disbursement_duration_days, contact_email, contact_phone, address, website, active) VALUES
('Apollo Munich Health Insurance', 'Orthopaedics Basic', 2000.0, 7, 'claims@apollomunich.com', '+91-1800-116-969', 'Mumbai, Maharashtra', 'www.apollomunichinsurance.com', true),
('Star Health Insurance', 'Orthopaedics Premium', 3500.0, 10, 'claims@starhealth.in', '+91-1800-425-2255', 'Chennai, Tamil Nadu', 'www.starhealth.in', true),
('HDFC ERGO Health', 'Ortho Care Plus', 2800.0, 5, 'claims@hdfcergo.com', '+91-1800-266-9966', 'Mumbai, Maharashtra', 'www.hdfcergo.com', true),
('ICICI Lombard Health', 'Urology Specialty', 4500.0, 7, 'claims@icicilombard.com', '+91-1800-266-7766', 'Mumbai, Maharashtra', 'www.icicilombard.com', true),
('Max Bupa Health', 'Urology Complete Care', 5500.0, 12, 'claims@maxbupa.com', '+91-1800-103-3911', 'New Delhi, Delhi', 'www.maxbupa.com', true),
('Bajaj Allianz Health', 'Urology Advanced', 4200.0, 8, 'claims@bajajallianz.co.in', '+91-1800-209-0144', 'Pune, Maharashtra', 'www.bajajallianz.co.in', true),
('LIC Health Insurance', 'Medical Comprehensive', 6000.0, 15, 'claims@licindia.com', '+91-022-6827-6827', 'Mumbai, Maharashtra', 'www.licindia.in', true),
('Oriental Insurance', 'Family Health Plus', 3000.0, 10, 'claims@orientalinsurance.co.in', '+91-1800-118-485', 'New Delhi, Delhi', 'www.orientalinsurance.co.in', true),
('National Insurance', 'Mediclaim Premium', 4000.0, 12, 'claims@nationalinsurance.nic.co.in', '+91-1800-200-7710', 'Kolkata, West Bengal', 'www.nationalinsuranceindia.nic.co.in', true),
('United India Insurance', 'Health Guardian', 3200.0, 9, 'claims@uiic.co.in', '+91-044-2829-2929', 'Chennai, Tamil Nadu', 'www.uiic.co.in', true);

-- Insert Treatment Packages
INSERT INTO treatment_packages (name, specialization, cost, duration_weeks, package_level) VALUES
('Orthopaedics Package 1', 'Orthopaedics', 2500.0, 4, 1),
('Orthopaedics Package 2', 'Orthopaedics', 3000.0, 6, 2),
('Urology Package 1', 'Urology', 4000.0, 4, 1),
('Urology Package 2', 'Urology', 5000.0, 6, 2);

-- Insert Specialists
INSERT INTO specialists (name, specialization, level, qualification, experience, contact_number, email, available) VALUES
('Dr. Rajesh Kumar', 'Orthopaedics', 'JUNIOR', 'MBBS, MS Orthopaedics', 3, '+91-9876543210', 'rajesh.kumar@healthsync.com', true),
('Dr. Priya Sharma', 'Orthopaedics', 'JUNIOR', 'MBBS, DNB Orthopaedics', 4, '+91-9876543211', 'priya.sharma@healthsync.com', true),
('Dr. Anil Gupta', 'Orthopaedics', 'SENIOR', 'MBBS, MS, MCh Orthopaedics', 15, '+91-9876543212', 'anil.gupta@healthsync.com', true),
('Dr. Sunita Rao', 'Orthopaedics', 'SENIOR', 'MBBS, MS, Fellowship Joint Replacement', 18, '+91-9876543213', 'sunita.rao@healthsync.com', true),
('Dr. Vikram Singh', 'Urology', 'JUNIOR', 'MBBS, MS Urology', 2, '+91-9876543214', 'vikram.singh@healthsync.com', true),
('Dr. Neha Jain', 'Urology', 'JUNIOR', 'MBBS, DNB Urology', 3, '+91-9876543215', 'neha.jain@healthsync.com', true),
('Dr. Ashok Mehta', 'Urology', 'SENIOR', 'MBBS, MS, MCh Urology', 20, '+91-9876543216', 'ashok.mehta@healthsync.com', true),
('Dr. Kavita Verma', 'Urology', 'SENIOR', 'MBBS, MS, Fellowship Uro-Oncology', 16, '+91-9876543217', 'kavita.verma@healthsync.com', true);

-- Insert Patient Details
INSERT INTO patient_details (name, age, ailment, treatment_package_name, treatment_start_date, treatment_end_date, contact_number, email, address, insurance_provider, treatment_status) VALUES
('Amit Sharma', 45, 'Knee joint pain and stiffness', 'Orthopaedics Package 1', CURRENT_DATE - INTERVAL '10' DAY, CURRENT_DATE + INTERVAL '18' DAY, '+91-9876543220', 'amit.sharma@gmail.com', '123 MG Road, Bangalore', 'Star Health Insurance', 'IN_PROGRESS'),
('Priya Patel', 38, 'Lower back pain and disc problems', 'Orthopaedics Package 2', CURRENT_DATE - INTERVAL '15' DAY, CURRENT_DATE + INTERVAL '27' DAY, '+91-9876543221', 'priya.patel@gmail.com', '456 Park Street, Mumbai', 'HDFC ERGO Health', 'IN_PROGRESS'),
('Rajesh Kumar', 52, 'Kidney stones and urinary issues', 'Urology Package 1', CURRENT_DATE - INTERVAL '8' DAY, CURRENT_DATE + INTERVAL '20' DAY, '+91-9876543222', 'rajesh.kumar@gmail.com', '789 Anna Salai, Chennai', 'ICICI Lombard Health', 'IN_PROGRESS'),
('Sunita Singh', 41, 'Bladder infection and related complications', 'Urology Package 2', CURRENT_DATE - INTERVAL '12' DAY, CURRENT_DATE + INTERVAL '30' DAY, '+91-9876543223', 'sunita.singh@gmail.com', '321 CP Road, Delhi', 'Max Bupa Health', 'IN_PROGRESS'),
('Vikram Rao', 48, 'Hip replacement surgery required', 'Orthopaedics Package 2', CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE + INTERVAL '37' DAY, '+91-9876543224', 'vikram.rao@gmail.com', '654 Brigade Road, Bangalore', 'Apollo Munich Health Insurance', 'IN_PROGRESS'),
('Neha Gupta', 35, 'Prostate treatment and monitoring', 'Urology Package 1', CURRENT_DATE - INTERVAL '18' DAY, CURRENT_DATE + INTERVAL '10' DAY, '+91-9876543225', 'neha.gupta@gmail.com', '987 Linking Road, Mumbai', 'Bajaj Allianz Health', 'IN_PROGRESS');

-- Insert Treatment Plans
INSERT INTO treatment_plans (patient_id, package_name, cost, specialist_name, specialist_level, specialization, treatment_start_date, treatment_end_date, duration_weeks, specialist_contact_number, specialist_email, status) VALUES
(1, 'Orthopaedics Package 1', 2500.0, 'Dr. Rajesh Kumar', 'JUNIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '10' DAY, CURRENT_DATE + INTERVAL '18' DAY, 4, '+91-9876543210', 'rajesh.kumar@healthsync.com', 'SCHEDULED'),
(2, 'Orthopaedics Package 2', 3000.0, 'Dr. Anil Gupta', 'SENIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '15' DAY, CURRENT_DATE + INTERVAL '27' DAY, 6, '+91-9876543212', 'anil.gupta@healthsync.com', 'SCHEDULED'),
(3, 'Urology Package 1', 4000.0, 'Dr. Vikram Singh', 'JUNIOR', 'Urology', CURRENT_DATE - INTERVAL '8' DAY, CURRENT_DATE + INTERVAL '20' DAY, 4, '+91-9876543214', 'vikram.singh@healthsync.com', 'SCHEDULED'),
(4, 'Urology Package 2', 5000.0, 'Dr. Ashok Mehta', 'SENIOR', 'Urology', CURRENT_DATE - INTERVAL '12' DAY, CURRENT_DATE + INTERVAL '30' DAY, 6, '+91-9876543216', 'ashok.mehta@healthsync.com', 'SCHEDULED'),
(5, 'Orthopaedics Package 2', 3000.0, 'Dr. Sunita Rao', 'SENIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE + INTERVAL '37' DAY, 6, '+91-9876543213', 'sunita.rao@healthsync.com', 'SCHEDULED'),
(6, 'Urology Package 1', 4000.0, 'Dr. Neha Jain', 'JUNIOR', 'Urology', CURRENT_DATE - INTERVAL '18' DAY, CURRENT_DATE + INTERVAL '10' DAY, 4, '+91-9876543215', 'neha.jain@healthsync.com', 'SCHEDULED');

-- Insert Claim Requests
INSERT INTO claim_requests (patient_name, ailment, treatment_package_name, treatment_cost, insurer_name, insurer_package_name, insurance_amount_limit, balance_amount, claim_status, claim_reference_number, patient_id, claim_initiated_date) VALUES
('Amit Sharma', 'Knee joint pain and stiffness', 'Orthopaedics Package 1', 2500.0, 'Star Health Insurance', 'Orthopaedics Premium', 3500.0, 250.0, 'APPROVED', 'CLM-2024-10001', 1, CURRENT_TIMESTAMP - INTERVAL '10' DAY),
('Priya Patel', 'Lower back pain and disc problems', 'Orthopaedics Package 2', 3000.0, 'HDFC ERGO Health', 'Ortho Care Plus', 2800.0, 200.0, 'PROCESSING', 'CLM-2024-10002', 2, CURRENT_TIMESTAMP - INTERVAL '15' DAY),
('Rajesh Kumar', 'Kidney stones and urinary issues', 'Urology Package 1', 4000.0, 'ICICI Lombard Health', 'Urology Specialty', 4500.0, 0.0, 'INITIATED', 'CLM-2024-10003', 3, CURRENT_TIMESTAMP - INTERVAL '8' DAY),
('Sunita Singh', 'Bladder infection and related complications', 'Urology Package 2', 5000.0, 'Max Bupa Health', 'Urology Complete Care', 5500.0, 0.0, 'APPROVED', 'CLM-2024-10004', 4, CURRENT_TIMESTAMP - INTERVAL '12' DAY);