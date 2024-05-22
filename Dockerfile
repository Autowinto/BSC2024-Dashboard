# Use the official Node.js 14 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nuxt.js application
RUN pnpm run build

# Expose the port that the application will run on
EXPOSE 8080

ENV API_URL=http://localhost:3000
ENV PORT=8080

# Start the application
CMD [ "pnpm", "start" ]