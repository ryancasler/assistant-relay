FROM node:10 

WORKDIR /usr/assistant-relay 

COPY . . 

RUN npm run setup 

EXPOSE 3000 

CMD node ./bin/www

