FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . . 
EXPOSE 5670
ENV Database_Url=mysql://avnadmin:AVNS_g0ozMEYipazmIOVEt9B@mysql-10080b99-sarthakrajesh2005-ca10.a.aivencloud.com:25202/defaultdb?ssl-mode=REQUIRED
ENV PORT=5670
ENV SECRET_KEY="4CM_84CK3ND"
RUN npx prisma generate
RUN npx prisma migrate
CMD ["npm","start"]