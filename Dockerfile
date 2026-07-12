# syntax=docker/dockerfile:1

# One image builds the whole workspace; the web and worker containers run
# from it with different commands (see docker-compose.prod.yml).

FROM node:22-slim AS base
RUN corepack enable
WORKDIR /app

# ---- build stage: install everything and build all workspaces ----
FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- runtime stage ----
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app /app
EXPOSE 3000
# Default command is the web server; the worker service overrides it.
CMD ["pnpm", "--filter", "@issuefit/web", "start"]
