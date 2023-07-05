# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run copy-assets
RUN npm run build

# Expose the port on which the application will run (replace 3000 with your desired port)
EXPOSE 9090

# Start the application
CMD ["npm", "start"]
