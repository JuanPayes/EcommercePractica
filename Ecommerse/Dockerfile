# ---- Etapa 1: Build ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos solo el pom.xml primero para aprovechar la cache de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Ahora copiamos el código fuente y compilamos
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Etapa 2: Runtime ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiamos solo el .jar compilado de la etapa anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]