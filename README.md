# Tire Depot — Next.js

Memphis's #1 online tire shop, rebuilt in Next.js 14 with the App Router.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context** (cart state)

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Hero** with animated counters
- **Shop** — filterable/sortable tire inventory (24 tires)
- **Cart** — slide-out panel, quantity editing, multi-step checkout (info → payment → confirmation)
- **Services** — 6 service cards
- **How It Works** — 4-step process
- **About** — stats, brand marquee
- **Contact** — location info with embedded map
- **Footer** — full links

## Customization

### Tire inventory
Edit `lib/tires.ts` — add/remove tires from the `TIRES` array.

### Square payment
Replace the placeholder "Pay Now" button in `components/CartPanel.tsx` with the [Square Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview).

### Branding / colors
Tweak CSS variables in `app/globals.css` and the theme in `tailwind.config.ts`.

## Deployment

Deploy on [Vercel](https://vercel.com) — push to GitHub and import the repo.

```bash
npm run build   # build for production
npm run start   # start production server
```
