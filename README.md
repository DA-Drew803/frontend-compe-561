# Vacation Together Frontend

This repository contains the web pages and user interactions for Vacation Together. The backend API is maintained separately in [backend-compe-561](https://github.com/DA-Drew803/backend-compe-561).

See [the web functional specification](docs/web-functional-spec.md) for the four-page flow, control behavior, and proposed API boundary.

## Run locally

Requires Node.js 20.9 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Use `pnpm lint`, `pnpm typecheck`, and `pnpm build` to verify changes.

The `/plan` route is a temporary destination for the Landing page's planning links. The Planning page will be built separately.
