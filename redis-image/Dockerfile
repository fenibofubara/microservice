# Use an existing docker image as base (serves as an OS)

FROM alpine


# Download and install a dependency

RUN apk add --update redis

RUN apk add --update gcc


# Tell the image what to do wheb it starts as a container
CMD ["redis-server"]