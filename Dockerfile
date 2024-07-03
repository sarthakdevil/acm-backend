FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . . 
EXPOSE 5670
RUN npx prisma generate
RUN npx prisma migrate
CMD ["npm","start"]