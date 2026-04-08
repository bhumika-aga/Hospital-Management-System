# 🏥 HealthSync - Advanced Hospital Management System

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.13-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Lombok](https://img.shields.io/badge/Lombok-1.18.30-red.svg)](https://projectlombok.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

HealthSync is a production-ready, highly optimized Hospital Management System designed to streamline international patient treatment planning and insurance claim processing. It leverages modern architectural patterns and best practices to ensure a robust, maintainable, and scalable solution.

---

## 🧠 **Logical Implementation & Concepts**

The system is built upon several core architectural and business logic concepts that drive the end-to-end patient care workflow.

### 1. **Stateless Security & Authentication**

The system implements **JWT (JSON Web Token)** based authentication.

- **Concept**: By using stateless tokens, the server doesn't need to store session information, allowing for better scalability and easier integration with mobile or distributed clients.
- **Logic**: Users generate a token via the `/auth/generate-token` endpoint, which is then passed in the `Authorization` header for all subsequent protected API calls.

### 2. **Automated Treatment Planning**

A core feature is the intelligent formulation of treatment timetables.

- **Concept**: Decoupling treatment packages from patient enrollment allows for standardized care paths.
- **Logic**: When a patient selects a treatment package (e.g., Orthopaedics Package 1), the system:
  - Automatically identifies the required **specialization**.
  - Assigns a **specialist level** based on the package tier (Tier 1 → Junior, Tier 2 → Senior).
  - Queries the database for an **available specialist** matching these criteria.
  - Generates a **timetable** with start/end dates and included tests (OPT1, UPT2, etc.).

### 3. **Integrated Insurance Claim Processing**

The insurance module bridges the gap between medical treatment and financial reimbursement.

- **Concept**: Real-time coverage validation and claim initiation.
- **Logic**: After treatment planning, the system:
  - Matches the patient's package with eligible **Insurance Providers**.
  - Calculates the **Coverage Amount** based on insurer-specific limits.
  - Computes the remaining **Balance Amount** the patient needs to pay.
  - Generates a unique **Claim Reference Number** and calculates the **Expected Disbursement Date**.

---

## 🛠️ **Optimized Coding Practices**

This project has been refactored to adhere to the highest standards of clean code and performance:

### 🚀 **Lombok Integration**

We have utilized **Project Lombok** to eliminate thousands of lines of boilerplate code (Getters, Setters, Constructors, toString). This ensures the codebase remains focused on actual business logic rather than ceremony.

### 🏗️ **Constructor-Based Dependency Injection**

Moved away from field injection (`@Autowired` on private fields) to **Constructor Injection** using `@RequiredArgsConstructor`.

- **Benefits**: Ensures dependencies are immutable (final), makes unit testing significantly easier, and prevents circular dependencies at startup.

### 🛡️ **Global Exception Handling**

Implemented a centralized `GlobalExceptionHandler` using `@RestControllerAdvice`.

- **Concept**: Standardizing API error responses ensures the frontend always receives a consistent JSON structure (`status`, `message`, `timestamp`, `path`) regardless of where an error occurs.

### 📊 **Database-Driven Business Logic**

Refactored core services to retrieve business rules (package costs, specialist assignments, insurer limits) from the database instead of hardcoded maps, making the system highly configurable without code changes.

---

## 🚀 **Tech Stack**

### **Backend**

| Technology             | Purpose                            |
| ---------------------- | ---------------------------------- |
| **Java 17**            | Core programming language          |
| **Spring Boot 3.5.13** | Application framework              |
| **Spring Data JPA**    | Data persistence layer             |
| **H2 Database**        | In-memory DB for rapid development |
| **Project Lombok**     | Boilerplate reduction              |
| **Spring Security**    | JWT-based auth & API protection    |
| **OpenAPI 3.0**        | Swagger UI documentation           |

### **Frontend**

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| **React 19**    | Modern UI framework          |
| **TypeScript**  | Type-safe development        |
| **Material-UI** | Apple-inspired design system |
| **Axios**       | Robust HTTP communications   |

---

## ⚡ **Quick Start**

### **Prerequisites**

- Java 17+
- Node.js 18+
- Maven 3.8+

### **1. Run Backend**

```bash
./mvnw clean spring-boot:run
```

- Access API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### **2. Run Frontend**

```bash
cd member-portal
npm install
npm start
```

- Access Portal: `http://localhost:3000`

---

## 📁 **Project Structure**

```txt
src/main/java/com/hospital/
├── 📁 auth/              # JWT Security & Identity
├── 📁 insurance/         # Claim Processing & Insurers
├── 📁 treatment/         # Packages & Specialists
├── 📁 exception/         # Centralized Error Handling
└── 📁 config/            # System-wide Configurations
```

---

## 🔗 **Useful Links**

- **H2 Console**: `http://localhost:8080/h2-console` (User: `sa`, Pass: `password`)
- **Actuator Health**: `http://localhost:8080/actuator/health`

---

**Version**: 3.0.0 (Production Ready)  
**Maintained by**: HealthSync Engineering Team
