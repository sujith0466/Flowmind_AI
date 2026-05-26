# API Spec

This document will track FlowMind AI API contracts.

## Planned MVP Endpoints

- `GET /health`: backend health check.
- `POST /api/workflows/generate`: generate a structured workflow from user input.
- `GET /api/workflows`: list saved workflows when persistence is enabled.
- `GET /api/workflows/:id`: fetch one saved workflow when persistence is enabled.

Keep request and response shapes stable so the frontend can move quickly.
