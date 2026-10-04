# Stage 1: Build the JAR with Maven
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the package
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Java 21 Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built JAR from builder stage
COPY --from=build /app/target/*.jar app.jar

# Run using dynamic port and Render-optimized memory flags
ENTRYPOINT ["sh", "-c", "java -Xmx400m -Xms200m -jar app.jar --server.port=${PORT:-8080}"]