-- Hospital Management System - Sample Data Initialization
-- This file initializes the database with sample data for development and testing

-- Insert Insurers
INSERT INTO insurer (insurer_name, package_name, amount_limit, disbursement_days, contact_email, contact_phone, address, website, active) VALUES
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
INSERT INTO treatment_package (package_name, specialization, treatment_procedures, cost, duration_weeks, complexity_level) VALUES
('Orthopaedics Package 1', 'Orthopaedics', 'OPT1,OPT2', 2500.0, 4, 1),
('Orthopaedics Package 2', 'Orthopaedics', 'OPT3,OPT4', 3000.0, 6, 2),
('Urology Package 1', 'Urology', 'UPT1,UPT2', 4000.0, 4, 1),
('Urology Package 2', 'Urology', 'UPT3,UPT4', 5000.0, 6, 2);

-- Insert Specialists
INSERT INTO specialist (name, specialization, experience_level, qualifications, years_of_experience, contact_number, email) VALUES
('Dr. Rajesh Kumar', 'Orthopaedics', 'JUNIOR', 'MBBS, MS Orthopaedics', 3, '+91-9876543210', 'rajesh.kumar@healthsync.com'),
('Dr. Priya Sharma', 'Orthopaedics', 'JUNIOR', 'MBBS, DNB Orthopaedics', 4, '+91-9876543211', 'priya.sharma@healthsync.com'),
('Dr. Anil Gupta', 'Orthopaedics', 'SENIOR', 'MBBS, MS, MCh Orthopaedics', 15, '+91-9876543212', 'anil.gupta@healthsync.com'),
('Dr. Sunita Rao', 'Orthopaedics', 'SENIOR', 'MBBS, MS, Fellowship Joint Replacement', 18, '+91-9876543213', 'sunita.rao@healthsync.com'),
('Dr. Vikram Singh', 'Urology', 'JUNIOR', 'MBBS, MS Urology', 2, '+91-9876543214', 'vikram.singh@healthsync.com'),
('Dr. Neha Jain', 'Urology', 'JUNIOR', 'MBBS, DNB Urology', 3, '+91-9876543215', 'neha.jain@healthsync.com'),
('Dr. Ashok Mehta', 'Urology', 'SENIOR', 'MBBS, MS, MCh Urology', 20, '+91-9876543216', 'ashok.mehta@healthsync.com'),
('Dr. Kavita Verma', 'Urology', 'SENIOR', 'MBBS, MS, Fellowship Uro-Oncology', 16, '+91-9876543217', 'kavita.verma@healthsync.com');

-- Insert Patient Details
INSERT INTO patient_detail (name, age, ailment, package_name, treatment_start_date, treatment_end_date, contact_number, email, address, insurance_provider) VALUES
('Amit Sharma', 45, 'Knee joint pain and stiffness', 'Orthopaedics Package 1', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '18 days', '+91-9876543220', 'amit.sharma@gmail.com', '123 MG Road, Bangalore', 'Star Health Insurance'),
('Priya Patel', 38, 'Lower back pain and disc problems', 'Orthopaedics Package 2', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '27 days', '+91-9876543221', 'priya.patel@gmail.com', '456 Park Street, Mumbai', 'HDFC ERGO Health'),
('Rajesh Kumar', 52, 'Kidney stones and urinary issues', 'Urology Package 1', CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '20 days', '+91-9876543222', 'rajesh.kumar@gmail.com', '789 Anna Salai, Chennai', 'ICICI Lombard Health'),
('Sunita Singh', 41, 'Bladder infection and related complications', 'Urology Package 2', CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '30 days', '+91-9876543223', 'sunita.singh@gmail.com', '321 CP Road, Delhi', 'Max Bupa Health'),
('Vikram Rao', 48, 'Hip replacement surgery required', 'Orthopaedics Package 2', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '37 days', '+91-9876543224', 'vikram.rao@gmail.com', '654 Brigade Road, Bangalore', 'Apollo Munich Health Insurance'),
('Neha Gupta', 35, 'Prostate treatment and monitoring', 'Urology Package 1', CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE + INTERVAL '10 days', '+91-9876543225', 'neha.gupta@gmail.com', '987 Linking Road, Mumbai', 'Bajaj Allianz Health');

-- Insert Treatment Plans
INSERT INTO treatment_plan (patient_id, package_name, tests, cost, specialist_name, specialist_level, specialization, start_date, end_date, duration_weeks, specialist_contact_number, specialist_email) VALUES
(1, 'Orthopaedics Package 1', 'X-Ray,MRI Scan', 2500.0, 'Dr. Rajesh Kumar', 'JUNIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '18 days', 4, '+91-9876543210', 'rajesh.kumar@healthsync.com'),
(2, 'Orthopaedics Package 2', 'CT Scan,Blood Test', 3000.0, 'Dr. Anil Gupta', 'SENIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '27 days', 6, '+91-9876543212', 'anil.gupta@healthsync.com'),
(3, 'Urology Package 1', 'Ultrasound,Urine Test', 4000.0, 'Dr. Vikram Singh', 'JUNIOR', 'Urology', CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '20 days', 4, '+91-9876543214', 'vikram.singh@healthsync.com'),
(4, 'Urology Package 2', 'Cystoscopy,PSA Test', 5000.0, 'Dr. Ashok Mehta', 'SENIOR', 'Urology', CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '30 days', 6, '+91-9876543216', 'ashok.mehta@healthsync.com'),
(5, 'Orthopaedics Package 2', 'Pre-op Tests,Post-op Care', 3000.0, 'Dr. Sunita Rao', 'SENIOR', 'Orthopaedics', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '37 days', 6, '+91-9876543213', 'sunita.rao@healthsync.com'),
(6, 'Urology Package 1', 'Kidney Function Test,Imaging', 4000.0, 'Dr. Neha Jain', 'JUNIOR', 'Urology', CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE + INTERVAL '10 days', 4, '+91-9876543215', 'neha.jain@healthsync.com');

-- Insert Claim Requests
INSERT INTO claim_request (patient_name, ailment, treatment_package, treatment_cost, insurer_name, package_name, amount_limit, covered_amount, claim_status, claim_reference_number, patient_id, claim_initiated_date) VALUES
('Amit Sharma', 'Knee joint pain and stiffness', 'Orthopaedics Package 1', 2500.0, 'Star Health Insurance', 'Orthopaedics Premium', 3500.0, 2250.0, 'APPROVED', 'CLM-2024-10001', 1, CURRENT_TIMESTAMP - INTERVAL '10 days'),
('Priya Patel', 'Lower back pain and disc problems', 'Orthopaedics Package 2', 3000.0, 'HDFC ERGO Health', 'Ortho Care Plus', 2800.0, 2700.0, 'PROCESSING', 'CLM-2024-10002', 2, CURRENT_TIMESTAMP - INTERVAL '15 days'),
('Rajesh Kumar', 'Kidney stones and urinary issues', 'Urology Package 1', 4000.0, 'ICICI Lombard Health', 'Urology Specialty', 4500.0, 3600.0, 'INITIATED', 'CLM-2024-10003', 3, CURRENT_TIMESTAMP - INTERVAL '8 days'),
('Sunita Singh', 'Bladder infection and related complications', 'Urology Package 2', 5000.0, 'Max Bupa Health', 'Urology Complete Care', 5500.0, 4500.0, 'APPROVED', 'CLM-2024-10004', 4, CURRENT_TIMESTAMP - INTERVAL '12 days');