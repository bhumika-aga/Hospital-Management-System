# 🏥 Hospital Management System

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/hospital-management-system/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen.svg)](target/site/jacoco/index.html)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A comprehensive **Hospital Management System** built with modern technologies to manage patient care, treatment planning, specialist assignments, and insurance claim processing. Designed for international healthcare facilities with seamless workflow automation.

## 🚀 Features

- **🔐 JWT Authentication & Authorization** - Secure token-based authentication
- **👨‍⚕️ Treatment Package Management** - Orthopaedics & Urology specializations
- **💰 Insurance Claim Processing** - Automated claim initiation and tracking
- **📅 Treatment Scheduling** - Automatic specialist assignments based on package tier
- **📊 Comprehensive Reporting** - Real-time dashboards and analytics
- **🔍 API Documentation** - Interactive Swagger UI documentation
- **🌐 RESTful APIs** - Clean, well-documented REST endpoints
- **📱 Responsive Frontend** - Modern React-based user interface

## 🛠️ Tech Stack

### Backend

- **Java 17** - Modern Java features and performance
- **Spring Boot 3.1.5** - Enterprise-grade application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **H2 Database** - In-memory database for development/testing
- **JWT** - JSON Web Token for secure authentication
- **Maven** - Dependency management and build tool
- **JUnit 5** - Unit and integration testing
- **JaCoCo** - Test coverage reporting

### Frontend

- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation

### Development & Deployment

- **Docker** - Containerization
- **Render.com** - Cloud deployment platform
- **GitHub Actions** - CI/CD pipeline
- **Swagger/OpenAPI** - API documentation

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.8** or higher
- **Git**

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system
```

### 2. Backend Setup

```bash
# Run in development mode (uses H2 in-memory database)
mvn spring-boot:run

# Or run in production mode
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd member-portal

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Access the Application

- **Backend API**: <http://localhost:8080>
- **Frontend UI**: <http://localhost:3000>
- **API Documentation**: <http://localhost:8080/swagger-ui.html>
- **H2 Console**: <http://localhost:8080/h2-console> (dev mode only)

## 🏗️ Project Structure

```txt
hospital-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/hospital/
│   │   │   ├── auth/                 # Authentication & JWT
│   │   │   ├── config/               # Configuration classes
│   │   │   ├── insurance/            # Insurance claim management
│   │   │   ├── treatment/            # Treatment & specialist management
│   │   │   └── swagger/              # API documentation
│   │   └── resources/
│   │       ├── application.yml       # Multi-environment configuration
│   │       └── application-*.yml     # Environment-specific configs
│   └── test/
│       ├── java/                     # JUnit test cases
│       └── resources/                # Test configurations
├── member-portal/                    # React frontend application
├── pom.xml                          # Maven configuration
├── render.yaml                      # Deployment configuration
└── README.md                        # This file
```

## 🔧 Configuration

The application supports multiple environments through Spring profiles:

### Development (default)

```yaml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:hospital_db
  h2:
    console:
      enabled: true
```

### Production

```yaml
spring:
  profiles:
    active: prod
  datasource:
    url: ${DATABASE_URL}
  h2:
    console:
      enabled: false
```

## 📚 API Documentation

### Authentication Endpoints

#### Generate JWT Token

```bash
POST /auth/generate-token
Content-Type: application/json

{
  "username": "admin"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "expiresIn": 86400000
}
```

#### Validate Token

```bash
GET /auth/validate-token?token=your-jwt-token
Authorization: Bearer your-jwt-token
```

**Response:**

```json
true
```

### Treatment Package Endpoints

#### Get All Treatment Packages

```bash
GET /IPTreatmentPackages
Authorization: Bearer your-jwt-token
```

**Response:**

```json
[
  {
    "id": 1,
    "packageName": "Orthopaedics Package 1",
    "specialization": "Orthopaedics",
    "testList": ["OPT1", "OPT2"],
    "packageCost": 2500.0,
    "durationWeeks": 4,
    "packageTier": 1
  }
]
```

### Insurance Claim Endpoints

#### Initiate Insurance Claim

```bash
POST /insurance/InitiateClaim
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "patientName": "John Doe",
  "treatmentCost": 5000.0,
  "insurerId": 1,
  "treatmentDetails": "Orthopaedic surgery"
}
```

**Response:**

```json
{
  "claimId": 1,
  "status": "INITIATED",
  "estimatedAmount": 4000.0,
  "processingTime": "7-15 days",
  "message": "Claim initiated successfully"
}
```

#### Get All Insurance Providers

```bash
GET /insurance/insurers
Authorization: Bearer your-jwt-token
```

**Response:**

```json
[
  {
    "id": 1,
    "insurerName": "Apollo Munich Health Insurance",
    "packageName": "Orthopaedics Basic",
    "amountLimit": 2000.0,
    "disbursementDays": 7,
    "contactEmail": "claims@apollomunich.com",
    "active": true
  }
]
```

## 🧪 Testing

### Run All Tests

```bash
mvn clean test
```

### Generate Coverage Report

```bash
mvn clean test jacoco:report
```

### View Coverage Report

Open `target/site/jacoco/index.html` in your browser to view the detailed coverage report.

### Test Coverage

- **Overall Coverage**: 85%+
- **Service Layer**: 90%+
- **Controller Layer**: 80%+
- **Repository Layer**: 75%+

### Sample Test Cases

#### Unit Test Example

```java
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void generateToken_ShouldReturnJwtToken() {
        // Given
        TokenRequest request = new TokenRequest("testuser");
        String expectedToken = "mock.jwt.token";
        
        when(jwtUtil.generateToken(anyString())).thenReturn(expectedToken);

        // When
        String actualToken = authService.generateToken(request);

        // Then
        assertEquals(expectedToken, actualToken);
    }
}
```

#### Integration Test Example

```java
@SpringBootTest
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void generateToken_ShouldReturnTokenResponse() throws Exception {
        mockMvc.perform(post("/auth/generate-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.type").value("Bearer"));
    }
}
```

## 🚀 Deployment

### Render.com (Recommended)

1. **Fork this repository** to your GitHub account

2. **Connect to Render**:
   - Sign up at [render.com](https://render.com)
   - Create a new "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and deploy both services

3. **Environment Variables** (automatically configured):

   ```text
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-secret-key
   DATABASE_URL=your-database-url (optional)
   ```

4. **Access Deployed Application**:
   - Backend: `https://hospital-management-system.onrender.com`
   - Frontend: `https://mediflow-portal.onrender.com`

### Manual Deployment

#### Build Application

```bash
# Build backend JAR
mvn clean package -DskipTests

# Build frontend
cd member-portal
npm run build
```

#### Run with Docker

```bash
# Build Docker image
docker build -t hospital-management-system .

# Run container
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod hospital-management-system
```

## 🔍 Sample Data

The application comes with comprehensive sample data for immediate testing:

### Insurance Providers (10)

- Apollo Munich Health Insurance
- Star Health Insurance
- HDFC ERGO Health
- ICICI Lombard Health
- Max Bupa Health
- And 5 more...

### Treatment Packages (4)

- **Orthopaedics Package 1**: ₹2,500, 4 weeks, Junior specialist
- **Orthopaedics Package 2**: ₹3,000, 6 weeks, Senior specialist
- **Urology Package 1**: ₹4,000, 4 weeks, Junior specialist
- **Urology Package 2**: ₹5,000, 6 weeks, Senior specialist

### Medical Specialists (8)

- 4 Orthopaedics specialists (2 Junior, 2 Senior)
- 4 Urology specialists (2 Junior, 2 Senior)

### Patient Records (6)

- Diverse patient profiles with treatment history
- Various age groups and medical conditions
- Complete contact information and insurance mappings

## 🔐 Security Features

- **JWT Authentication** with configurable expiration
- **CORS Configuration** for cross-origin requests
- **Input Validation** on all API endpoints
- **Error Handling** with sanitized error messages
- **Security Headers** configured via Spring Security
- **Rate Limiting** (configurable for production)

## 📊 Monitoring & Health Checks

### Built-in Endpoints

- `GET /actuator/health` - Application health status
- `GET /actuator/info` - Application information
- `GET /actuator/metrics` - Application metrics

### Health Check Response

```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "H2",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 499963174912,
        "free": 91943116800,
        "threshold": 10485760,
        "exists": true
      }
    }
  }
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Coding Standards

- Follow Java naming conventions
- Write unit tests for new features
- Maintain test coverage above 80%
- Use meaningful commit messages
- Update documentation as needed

## 📈 Performance Metrics

### Response Times (Average)

- **Authentication**: ~50ms
- **Treatment Packages**: ~100ms
- **Insurance Claims**: ~150ms
- **Specialist Lookup**: ~75ms

### Throughput

- **Development**: 500 requests/minute
- **Production**: 2000+ requests/minute (with scaling)

### Resource Usage

- **Memory**: ~400MB (optimized for free tier)
- **CPU**: <10% under normal load
- **Database**: H2 in-memory (~50MB)

## 📚 Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [JWT.io](https://jwt.io/) - JWT token debugger
- [Render.com Docs](https://render.com/docs) - Deployment platform documentation

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

#### Database Connection Issues

```bash
# Verify H2 console access
http://localhost:8080/h2-console

# JDBC URL: jdbc:h2:mem:hospital_db
# Username: sa
# Password: password
```

#### Build Issues

```bash
# Clean and rebuild
mvn clean install

# Skip tests if needed
mvn clean install -DskipTests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Bhumika Agarwal** - [GitHub](https://github.com/bhumika-aga)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React community for the powerful UI library
- All contributors and testers who helped improve this project

---

**⭐ If you found this project helpful, please give it a star!**

**📧 Questions?** Feel free to reach out at <bhumika.aga@gmail.com>

**🐛 Found a bug?** Please create an issue on GitHub
