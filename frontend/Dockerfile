#https://medium.com/@fabiozuin/build-once-deploy-anywhere-with-angular-17-bf477c49668f

FROM node:20-alpine AS build

WORKDIR /app
COPY tourplaner-online/package*.json ./
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

FROM nginx:stable-alpine

COPY --from=build /app/dist/tourplaner/browser /usr/share/nginx/html
COPY nginx.comf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
