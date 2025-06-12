# Estágio de construção
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Aceita o argumento BUILD_PROFILE
ARG BUILD_PROFILE=dev

WORKDIR /workspace

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src src

# Usa o perfil no build
RUN mvn package -DskipTests -P${BUILD_PROFILE}

# Estágio de execução
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8080

# Passa o profile para execução
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=${BUILD_PROFILE}"]
