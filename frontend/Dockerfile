# Use official Node.js image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Default command to run the frontend
CMD ["npm", "run", "dev"]
