# Maven + Eclipse Temurin JDK 21 base image (the project does not use the Maven wrapper)
FROM maven:3.9-eclipse-temurin-21

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests -B

# Expose port
EXPOSE ${PORT:-8080}

# Run the application
CMD ["java", "-Dserver.port=${PORT:-8080}", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod}", "-jar", "target/hospital-management-system-2.0.0.jar"]