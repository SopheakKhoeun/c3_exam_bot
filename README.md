# WMAD C3 Exam Prep Bot

Telegram bot MVP that helps you prepare for the WMAD C3 final practical exam with practice questions, answers, explanations, and progress tracking.

## Features

- `/start` welcome menu with Backend, Frontend, Random Question, and My Progress
- Category and random question practice with Show Answer flow
- Progress tracking (answered, correct, wrong, accuracy %)
- Admin `/add` interactive flow to create new questions
- PostgreSQL + Prisma repository/service architecture

## Tech Stack

- Node.js
- Express.js
- Telegraf
- Prisma
- PostgreSQL 16
- Docker Compose
- dotenv

## Project Structure

```text
exam-prep-bot/
├── src/
│   ├── bot.js
│   ├── commands/
│   ├── services/
│   ├── database/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── seed/
├── resources/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Installation

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```env
BOT_TOKEN=your_telegram_bot_token_here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exam_bot?schema=public
ADMIN_TELEGRAM_ID=your_telegram_user_id
PORT=3000
```

## Docker

Start PostgreSQL 16 with database `exam_bot`:

```bash
docker compose up -d
```

Check that the container is healthy:

```bash
docker compose ps
```

## Prisma Migration

Generate the Prisma client and create/apply migrations:

```bash
npm run db:generate
npm run db:migrate
```

If you prefer a quick local schema sync without migration files:

```bash
npm run db:push
```

## Seed

Seed default categories and practice questions (20 Backend, 20 Frontend, 5 SQL, 5 Prisma, plus React/Express/Tailwind samples):

```bash
npm run db:seed
```

## Keep the bot online 24/7

Telegram only works while your bot process is running.

### Option A — Docker on this Mac (good if Mac stays on)

```bash
# stop local npm start first (Ctrl+C)
docker compose up -d --build
docker compose logs -f bot
```

After first deploy, seed once:

```bash
docker compose exec bot node seed/seed.js
```

`restart: unless-stopped` will restart the bot if it crashes.  
If you shut down the Mac / Colima, the bot goes offline.

### Option B — PM2 on this Mac

```bash
npm install -g pm2
npm run pm2:start
pm2 save
pm2 startup
```

### Option C — Free cloud host (best for classmates 24/7)

Deploy to Railway / Render / Fly.io with:
- your GitHub repo
- env vars from `.env`
- a PostgreSQL addon
- start command: `npx prisma migrate deploy && npm run db:seed && npm start`

Then your laptop can be off and people can still practice.

## Invite classmates

Real bot link:

```text
https://t.me/c3_exam_bot
```

Copy/paste invite:

```text
📚 WMAD C3 Exam Prep Bot

Hey! Join me practicing for the WMAD C3 final exam.

👉 Open the bot: https://t.me/c3_exam_bot

Then tap Start (or send /start).

What you get:
• Backend / Frontend / SQL / MongoDB questions
• Random practice + Show Answer + explanations
• Progress tracking
• Auto questions every day at 8:00 AM & 1:00 PM

Let’s practice together 💪
```

## Run Bot

```bash
npm start
```

Development mode with file watching:

```bash
npm run dev
```

Health check:

```text
http://localhost:3000/health
```

## Group Topics (forum mode)

Make the bot post into Topics like a build-alert group:

1. Open **WMAD C3 Bot** group → Group settings → enable **Topics**
2. Add the bot as **Admin** with **Manage Topics** (+ post messages)
3. In the group, send:
   - `/whereami` — shows `chat_id` / `message_thread_id`
   - `/topics` — creates topics: **Hourly**, Backend, Frontend, Fullstack, SQL, …
4. Test: `/sendhourly` (posts into **Hourly** topic)

Optional manual bind (stand inside a topic):

```text
/bind Hourly
/bind Backend
```

List bindings: `/listtopics`

Scheduled drops then go to:
- **Hourly topic** → every hour (1 question)
- **Each category topic** → 08:00 & 13:00 packs
- Plus private DMs for users who used `/start`


| Schedule | What users get |
|----------|----------------|
| Every hour | **1 random question** |
| 08:00 | One question from **each category** |
| 13:00 | One question from **each category** |

At 08:00 and 13:00 the hourly drop is skipped (daily pack only).

Timezone default: `Asia/Phnom_Penh` (UTC+7).

Configure in `.env`:

```env
TZ_SCHEDULE=Asia/Phnom_Penh
CRON_MORNING=0 8 * * *
CRON_AFTERNOON=0 13 * * *
CRON_HOURLY=0 * * * *
```

Also set `CRON_HOURLY` on Railway bot variables.

Admin test commands:
- `/sendnow` — daily all-category pack now
- `/sendhourly` — one hourly question now

**Note:** The bot process must keep running (Railway or `npm start`) for cron jobs to fire.

## Telegram Commands

| Command | Description |
|---------|-------------|
| `/start` | Open welcome menu |
| `/add` | Admin-only interactive question creation |
| `/sendnow` | Admin-only: daily all-category send now |
| `/sendhourly` | Admin-only: hourly 1-question send now |
| `/whereami` | Show chat_id + topic thread_id |
| `/topics` | Admin: create Hourly + category forum topics |
| `/bind <name>` | Admin: bind current topic (e.g. `/bind Hourly`) |
| `/listtopics` | Admin: list bound group topics |

### `/start` buttons

- 📚 Backend — random Backend question
- 🎨 Frontend — random Frontend question
- 🛒 Fullstack — Mini Store + Order Desk scenarios
- 🎲 Random Question — random question from all categories
- 📊 My Progress — answered / correct / wrong / accuracy

### Practice flow

1. Bot shows the question
2. Press **Show Answer**
3. Bot shows answer + explanation
4. Mark **Correct** or **Wrong** to update progress

### Admin `/add` flow

Only `ADMIN_TELEGRAM_ID` can use this command:

1. Select category
2. Send question text
3. Send answer
4. Send explanation
5. Question is saved to PostgreSQL

## Default Categories

- Backend
- Frontend
- Prisma
- SQL
- React
- Express
- Tailwind

## Question Format

```text
Question
What is Prisma Transaction?

Answer
A Prisma Transaction executes multiple database operations atomically.

Explanation
If one operation fails, all operations rollback.
```

## Architecture

- **Repository pattern** — Prisma access lives in `src/database/repositories`
- **Service layer** — business logic lives in `src/services`
- **Commands** — Telegram handlers live in `src/commands`
- **Utils** — env validation, keyboards, formatting, admin checks, sessions

## License

ISC
