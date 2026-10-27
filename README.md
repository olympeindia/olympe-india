# OLYMPE INDIA

The OLYMPE INDIA event website, built with Next.js App Router and deployed
to Cloudflare Workers with OpenNext.

## Routes

- `/` — both confirmed event dates and cities.
- `/bangalore` — Bengaluru event information only.
- `/delhi` — Delhi event information only.

Ticket and directions URLs are maintained in `data/event.js`. City pages use
that data to render only their own date, ticket destination, directions, and
city-specific event labels.

## Local development

Install dependencies and start the Next.js development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the available checks:

```bash
npm run lint
npm run build
```

## Cloudflare preview

Build the OpenNext Worker output, then run it locally with Wrangler:

```bash
npx opennextjs-cloudflare build
npx wrangler dev
```

## Cloudflare deployment

After review, with Cloudflare authentication configured for the account and
Worker named in `wrangler.jsonc`, build and deploy using OpenNext:

```bash
npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
```

The deployment command publishes to Cloudflare; it is not part of local
development or validation.
