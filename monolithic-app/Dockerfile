# Multi-stage build for hospital-management-system
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first for better layer caching
COPY .mvn .mvn
COPY mvnw mvnw.cmd pom.xml ./
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

# Add labels for better container management
LABEL maintainer="healthsync-team"
LABEL version="2.0.0"
LABEL description="Hospital Management System - HealthSync"

# Install curl for health checks
RUN apk add --no-cache curl

# Create app user for security
RUN addgroup -S appgroup && adduser -S -G appgroup appuser

# Set working directory
WORKDIR /app

# Create data directory
RUN mkdir -p /app/data && chown -R appuser:appgroup /app

# Copy the jar file from builder stage
COPY --from=builder /app/target/hospital-management-system-*.jar /app/hospital-management-system.jar

# Change ownership to app user
RUN chown appuser:appgroup /app/hospital-management-system.jar

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/hospital-management-system.jar"]