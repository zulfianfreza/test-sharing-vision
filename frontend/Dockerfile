# Use the official Node image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React application files into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3007

# Command to run the React app
CMD ["npm", "start"]