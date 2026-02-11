# Connect Docker Desktop to a repository

Use this guide so Docker can pull images and (optionally) push to a container registry. It also helps fix credential errors like `error getting credentials`.

## Option 1: Sign in via Docker Desktop (recommended)

1. Open **Docker Desktop**.
2. Click your **profile icon** (top right) → **Sign in** (or **Accounts**).
3. Sign in with **Docker Hub** or **Sign in with GitHub**.
4. After signing in, `docker compose pull` and `docker compose up` will use your account.

## Option 2: Sign in via terminal

```bash
# Docker Hub
docker login

# GitHub Container Registry (use a Personal Access Token as password)
docker login ghcr.io -u YOUR_GITHUB_USERNAME
```

## Option 3: Fix credential helper errors (macOS)

If you see:

`error getting credentials - err: exit status 1, out: One or more parameters passed to the function were not valid. (-50)`

1. Quit Docker Desktop completely.
2. Open `~/.docker/config.json` and remove or comment out the `"credsStore"` line (e.g. `"credsStore": "desktop"` or `"credsStore": "osxkeychain"`).
3. Start Docker Desktop again and sign in via the UI (Option 1).
4. Alternatively: **Docker Desktop → Settings → Docker Engine** — ensure nothing overrides the config; or sign out and sign back in to reset credentials.

## Run this project with Docker

From the project root:

```bash
docker compose up -d --build
```

- **Frontend:** http://localhost:8080  
- **Backend API:** http://localhost:3000  
- **Database:** PostgreSQL on port 5432 (user `lego_user`, db `lego_explorer`)

See [README.md](./README.md) for full setup and troubleshooting.
