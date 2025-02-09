FROM node:alpine

WORKDIR /uscr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
