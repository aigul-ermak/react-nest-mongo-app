# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your backend runs on (e.g., 3000 for NestJS/Express)
EXPOSE 3000

# Start the backend application
CMD ["yarn", "start:dev"]
