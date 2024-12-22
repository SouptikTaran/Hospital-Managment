# Stage 1: Build
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install dependencies
RUN npm install

COPY --chown=node:node . .


# Copy the entire project to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy only the production dependencies
# COPY package*.json ./ 
# RUN npm install --only=production

# Copy the build output from the build stage
COPY --from=build /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
