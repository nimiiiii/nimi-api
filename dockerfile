FROM node:latest
LABEL maintainer="Capuccino<chinodesuuu@gmail.com>"
USER root

# Set permissions so we can 
RUN  mkdir /opt/app && \
     chown -R node:root /opt;

# Set user to default node user
USER node
COPY --chown=node:root . /opt/app 

WORKDIR /opt/app 

RUN yarn && \
    rm -rf dockerfile;

CMD ["yarn", "start"]