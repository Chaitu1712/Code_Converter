# ---------------------------------------------
# Stage 1: Build the Application with Maven & Temurin 21
# ---------------------------------------------
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy Maven wrapper & POM first to leverage Docker layer caching
COPY pom.xml .
COPY src ./src

# Build the executable jar without running unit tests during image creation
RUN mvn clean package -DskipTests

# ---------------------------------------------
# Stage 2: Minimal Production Runtime
# ---------------------------------------------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /build/target/*.jar app.jar

# Render exposes PORT dynamically (defaults to 10000 or 8080)
EXPOSE 8080

# Run with memory constraints optimized for Render's free tier
ENTRYPOINT ["java", "-Xmx400m", "-Xms128m", "-jar", "app.jar"]