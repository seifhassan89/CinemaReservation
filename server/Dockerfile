# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your NestJS application runs on
EXPOSE 3001

# Start the NestJS application
RUN npm run build
CMD ["node", "dist/src/main.js"]