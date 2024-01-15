FROM node:latest as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/employee-portal-front-end/* /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
