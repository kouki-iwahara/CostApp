FROM mhart/alpine-node:12

WORKDIR /app

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/ash"]
# CMD ["npm", "run", "dev"]