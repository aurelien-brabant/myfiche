FROM		alpine:3.9

# Install required packages. The yarn package should install
# NodeJS and all the required deps.
RUN			apk update && apk upgrade && apk add	\
											yarn

RUN			mkdir -p /usr/app

WORKDIR		/usr/app

# Copy all the files, expected those listed in the .dockerignore file.
COPY 		. .

# Install and build the NextJS web application
RUN			yarn install

ENTRYPOINT	["sh", "entrypoint.sh"]
