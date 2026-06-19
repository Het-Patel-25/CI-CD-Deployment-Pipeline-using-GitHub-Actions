# CI/CD Deployment Pipeline using GitHub Actions

## Project Overview

This repository demonstrates a full CI/CD deployment pipeline using GitHub Actions for a Node.js + React application.The application itself is a **Realtime Live Coding Platform** that allows multiple users to collaborate and code together simultaneously. The automated pipeline manages building both tiers, packaging them via multi-stage Docker builds, publishing container images to GitHub Container Registry (GHCR), and triggering live continuous deployment to Render.


## What this project includes

- Backend built with **Express** and **Socket.IO**
- Frontend built with **React**, **Vite**, and **Tailwind CSS**
- Full **Docker** build using a multi-stage Dockerfile
- **GitHub Actions** workflow to automate the pipeline
- Deployment trigger to **Render** after successful build

## Architecture

- `Backend/` contains the server application and API logic.
- `Frontend/` contains the React application and Vite config.
- `dockerfile` builds the frontend in a first stage, then packages the backend and frontend output together.
- `.github/workflows/deploy.yml` defines the CI/CD workflow.

## CI/CD Pipeline (GitHub Actions)

The main pipeline is executed on every push or pull request to the `main` branch.

### Steps in the workflow

1. **Checkout repository**
2. **Install backend dependencies** in `Backend/`
3. **Build backend** (currently confirms backend install success)
4. **Install frontend dependencies** in `Frontend/`
5. **Build frontend** with `npm run build`
6. **Login to GitHub Container Registry** using `GITHUB_TOKEN`
7. **Build and push Docker image** with tags:
   - `ghcr.io/het-patel-25/ci-cd-deployment-pipeline-using-github-actions:latest`
   - `ghcr.io/het-patel-25/ci-cd-deployment-pipeline-using-github-actions:<commit-sha>`
8. **Deploy to Render** by triggering the Render service deploy API

### Workflow file

The workflow is defined in:

- `.github/workflows/deploy.yml`

## Technologies used

- GitHub Actions
- Docker
- GitHub Container Registry (GHCR)
- Node.js
- Express
- React
- Vite
- Tailwind CSS
- Render

## Local setup

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Full local run

From the project root, run the backend dev script to start both backend and frontend in development mode:

```bash
cd Backend
npm run dev
```

## Deployment configuration
Frontend Deployment URL-https://cicd-frontend-6x41.onrender.com
Backend Deployment URL-https://ci-cd-backend-v739.onrender.com 

### Render service setup

For the frontend static site service:

- `Root Directory`: `Frontend`
- `Build Command`: `npm install && npm run build`
- `Publish Directory`: `dist`

### GitHub secrets required

Add these secrets to the GitHub repository settings under **Settings → Secrets and variables → Actions**:

- `RENDER_API_KEY`
- `RENDER_FRONTEND_SERVICE_ID`

## Repository structure

```
Docker Aws/
├─ Backend/
├─ Frontend/
├─ .github/workflows/deploy.yml
├─ dockerfile
└─ README.md
```

## Notes

- The workflow currently builds a Docker image and pushes it to GHCR.
- Render deployment is triggered after the build completes.
- This repository is intended as a demonstration of a complete GitHub Actions CI/CD pipeline.
