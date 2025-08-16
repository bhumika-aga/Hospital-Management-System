# Multi-stage build for hospital-management-system
FROM maven:3.9.2-openjdk-17-slim AS builder

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM openjdk:17-jre-slim

# Add labels for better container management
LABEL maintainer="healthsync-team"
LABEL version="2.0.0"
LABEL description="Hospital Management System - HealthSync"

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Create app user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

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