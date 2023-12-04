# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install dotenv globally
RUN npm install -g dotenv

# Bundle app source
COPY . .

# Expose the port that your app runs on
EXPOSE 8090

# Start the application with dotenv and nodemon
CMD ["dotenv", "nodemon", "server.js"]
