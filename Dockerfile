# DELIBERATE TEST ISSUES: base image by tag (not digest), runs as root, no HEALTHCHECK (SBS-S04, SBS-S05).
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "src/server.js"]
