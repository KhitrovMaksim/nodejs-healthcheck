FROM node:18.13.0-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production --omit=dev
USER node
CMD ["node", "server.js"]
