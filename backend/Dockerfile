# Dockerfile for Go application

# Use the official Golang image as the base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app/backend

# Copy the Go application files into the container
COPY . .

# Download and install any dependencies
RUN go mod download

# Build the Go application
RUN go build -o main .

# Expose the port that the Go application will run on
EXPOSE 8007

# Command to run the Go application
CMD ["./main"]