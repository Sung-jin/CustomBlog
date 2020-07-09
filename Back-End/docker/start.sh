#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && cd .. && pwd -P )"
DOCKER_DIR="$DIR"/docker

$DIR/gradlew :build
mv "$DIR"/build/libs/* "$DOCKER_DIR"/custom-blog.jar

cat > "$DOCKER_DIR"/Dockerfile <<EOF
FROM openjdk:8-jdk-alpine

ARG env

ADD $DOCKER_DIR/custom-blog.jar custom-blog.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=\$env
ENV SPRING_CLOUD_CONFIG_USERNAME=devOps
ENV SPRING_CLOUD_CONFIG_PASSWORD=a.-quE4:LREPXB]DXpTe
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /custom-blog.jar
EOF

docker stop custom-blog && docker rm custom-blog
docker rmi $(docker images |grep 'custom-blog')
docker-compose -f "$DOCKER_DIR"/docker-compose.yml build --build-arg env=$1
docker-compose -f "$DOCKER_DIR"/docker-compose.yml up -d
