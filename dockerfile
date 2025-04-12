# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose desired port (default 3000, or 4000 if you're using that)
EXPOSE 4000

# Set environment variable for custom port
ENV PORT=4000

# Start the app
CMD ["npm", "run", "start"]
