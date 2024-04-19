# ---- Base Node ----
  FROM node:18.20.0-alpine AS base
  WORKDIR /app
  COPY package*.json ./
  RUN apk add --no-cache vim sqlite
  
  # ---- Dependencies ----
  FROM base AS dependencies
  RUN npm install

  # ---- Copy Files/Build ----
  FROM dependencies AS build
  COPY . . 
  RUN npm run build
  RUN npm run prisma:generate
  RUN npm run prisma:migrate:deploy
  
  # --- Release ----
  FROM base AS release
  RUN npm install -g pm2
  
  COPY --from=dependencies /app/node_modules ./node_modules
  COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma 
  COPY --from=build /app/build ./build
  COPY --from=build /app/*.db* ./
  COPY .env.example .env
  EXPOSE 3000
  CMD ["pm2-runtime", "build/server.js"]
  # CMD ["node", "build/server.js"]