# Multi-stage build for Spring Boot application
FROM openjdk:17-jdk-slim AS builder

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn ./.mvn
COPY pom.xml .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Download dependencies (for better caching)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN ./mvnw clean package -DskipTests

# Production stage
FROM openjdk:17-jre-slim

# Install curl for health checks and security updates
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Create application user for security
RUN groupadd -r healthsync && useradd -r -g healthsync healthsync

# Set working directory
WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/hospital-management-system-*.jar app.jar

# Create necessary directories
RUN mkdir -p /app/data /app/logs

# Set proper permissions
RUN chown -R healthsync:healthsync /app

# Switch to non-root user
USER healthsync

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Environment variables
ENV JAVA_OPTS="-Xmx400m -Xms200m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication"
ENV SPRING_PROFILES_ACTIVE=prod

# Start application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]