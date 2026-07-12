# Deploy IssueFit on your VM (Docker)

Follow these steps top to bottom. At the end, anyone can visit your domain,
sign in with GitHub, and use the app. You are the admin; everyone else is a
normal user.

Everything runs in Docker: the web app, the background worker, PgBouncer, and
Caddy (which gives you free HTTPS automatically). **Postgres is not part of
this stack** — you provide your own, separately-hosted Postgres server, and
PgBouncer pools connections to it. This keeps the app VM small and avoids
database data competing with Docker images for disk space.

---

## Before you start, you need

- A VM you can SSH into (Ubuntu is assumed below).
- A separately-hosted Postgres server (its own VM or box) that this app's VM
  can reach over the network, with a database and user already created.
- A domain name (e.g. `issuefit.example.com`).
- Point that domain's DNS **A record** at your VM's public IP.
- Ports **80** and **443** open on the VM's firewall.

---

## 1. Install Docker on the VM

```bash
curl -fsSL https://get.docker.com | sh
```

Log out and back in so Docker works without `sudo`.

## 2. Get the code onto the VM

```bash
git clone https://github.com/CrowPus/issuefit.git
cd issuefit
```

## 3. Create your settings file

```bash
cp .env.production.example .env
nano .env
```

Fill in every value marked `CHANGE_ME`:

- **`DOMAIN`** — your domain, e.g. `issuefit.example.com`.
- **`POSTGRES_HOST`** — the hostname or IP of your separately-hosted Postgres
  server. **`POSTGRES_PASSWORD`** — its password. Put the **same** password
  inside `DATABASE_URL` (only the password part changes).
- **`BETTER_AUTH_SECRET`** — run `openssl rand -base64 32` and paste the result.
- **`BETTER_AUTH_URL`** — `https://` + your domain.
- **`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`** — from step 4 below.
- **`GITHUB_SERVICE_TOKEN`** — a fine-grained GitHub token with
  **Public repositories, read-only** access.
- **`ADMIN_GITHUB_USERNAMES`** — your GitHub username (this makes you the admin).

Save and exit (in nano: `Ctrl+O`, `Enter`, `Ctrl+X`).

## 4. Create the GitHub sign-in app

1. Go to **github.com/settings/developers → New OAuth App**.
2. **Homepage URL:** `https://YOURDOMAIN`
3. **Authorization callback URL:** `https://YOURDOMAIN/api/auth/callback/github`
4. Create it, copy the **Client ID** and a generated **Client Secret** into
   your `.env` (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`).

## 5. Start everything

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

The first run builds the app (a few minutes). It automatically applies the
database migrations before the web app starts.

Check it's up:

```bash
docker compose -f docker-compose.prod.yml ps
```

All services should show `running` (the `migrate` one shows `exited (0)` —
that's correct, it runs once and stops).

## 6. Open your site

Visit `https://YOURDOMAIN`. Caddy fetches an HTTPS certificate on the first
visit (give it a few seconds). Sign in with GitHub.

## 7. Fill the catalog (as admin)

Recommendations come from repositories you add. Sign in, go to
`/admin/repositories`, and add a handful of open-source repos, then click
"Sync issues" on each. Now every user gets real recommendations. Maintainers
can also list their own projects at `/projects/submit` without you.

---

## Everyday operations

```bash
# See logs
docker compose -f docker-compose.prod.yml logs -f web
docker compose -f docker-compose.prod.yml logs -f worker

# Update to the latest code
git pull
docker compose -f docker-compose.prod.yml up -d --build

# Restart everything
docker compose -f docker-compose.prod.yml restart

# Back up the database
docker compose -f docker-compose.prod.yml exec postgres \
  pg_dump -U issuefit issuefit > backup-$(date +%F).sql
```

## If sign-in fails

- `BETTER_AUTH_URL` must be exactly `https://` + your domain, no trailing slash.
- The GitHub OAuth callback URL must be
  `https://YOURDOMAIN/api/auth/callback/github`.

## If the app can't reach the database

Confirm PgBouncer is healthy: `docker compose -f docker-compose.prod.yml logs pgbouncer`.
Common causes: `POSTGRES_HOST`/`POSTGRES_PORT` in `.env` don't point at your
external Postgres server, or that server's firewall doesn't allow inbound
connections from this VM's IP. As a quick test you can point `DATABASE_URL`
straight at your external Postgres (`@YOUR_POSTGRES_HOST:5432` instead of
`@pgbouncer:6432`) to confirm the network path and credentials work, then
fix PgBouncer's configuration.
