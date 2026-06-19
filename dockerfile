FROM node:20-alpine as frontend-build

WORKDIR /frontend
COPY ./Frontend/package*.json ./
RUN npm install
COPY ./Frontend .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY ./Backend/package*.json ./
RUN npm install
COPY ./Backend .
COPY --from=frontend-build /frontend/dist /app/public

EXPOSE 3000
CMD ["node", "server.js"]