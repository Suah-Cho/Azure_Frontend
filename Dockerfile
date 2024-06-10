FROM node AS builder
RUN mkdir /client
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
# ARG REACT_APP_SERVER_IP
# ENV REACT_APP_SERVER_IP='http://40.82.144.200:8000'
RUN npm run build

FROM nginx AS runner
COPY --from=builder /client/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD [ "nginx", "-g", "daemon off;" ]