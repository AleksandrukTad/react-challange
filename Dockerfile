FROM node:10-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY ./node_modules ./node_modules
COPY ./.next ./.next

EXPOSE 3000
ENTRYPOINT [ "tini", "--" ]
CMD ["./node_modules/.bin/next", "start"]
