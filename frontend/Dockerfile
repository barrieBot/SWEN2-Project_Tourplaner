#https://medium.com/@fabiozuin/build-once-deploy-anywhere-with-angular-17-bf477c49668f

FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

FROM nginx:stable-alpine

COPY --from=build /app/dist/tourplaner-online/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
