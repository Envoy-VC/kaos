# Use a specific Node.js version for better reproducibility
FROM node:23.3.0-slim AS builder

# Install pnpm globally and install necessary build tools
RUN npm install -g pnpm@9.15.1 && \
    apt-get update && \
    apt-get install -y git python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Python 3 as the default python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Set the working directory
WORKDIR /app

# Copy package.json and other configuration files
COPY package.json ./
COPY tsconfig.json ./

# Copy the rest of the application code
COPY ./src ./src

# Install dependencies and build the project
RUN pnpm install --no-frozen-lockfile

# install @anush/tokenizers-arm64-gnu
RUN apt-get update && \
    apt-get install -y curl pkg-config libssl-dev build-essential && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

RUN cd /app/node_modules/.pnpm/fastembed@1.14.1/node_modules/@anush008/tokenizers && \
    cargo build && \
    cp /app/node_modules/.pnpm/fastembed@1.14.1/node_modules/@anush008/tokenizers/target/debug/libanush008_tokenizers.so /app/node_modules/.pnpm/fastembed@1.14.1/node_modules/@anush008/tokenizers/tokenizers.linux-arm64-gnu.node

RUN pnpm build 

# Create dist directory and set permissions
RUN mkdir -p /app/dist && \
    chown -R node:node /app && \
    chmod -R 755 /app

# Switch to node user
USER node

# Create a new stage for the final image
FROM node:23.3.0-slim

# Install runtime dependencies if needed
RUN npm install -g pnpm@9.15.1
RUN apt-get update && \
    apt-get install -y git python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built artifacts and production dependencies from the builder stage
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/src /app/src
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/tsconfig.json /app/

EXPOSE 3001
# Set the command to run the application
CMD ["pnpm", "start", "--non-interactive"]