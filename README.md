# Content Board

A personal YouTube content strategy tool - your Blort AI alternative for managing video content across boards.

## Features

- 📋 **Boards** - Create and organize projects/boards to manage related content
- 🎬 **YouTube Integration** - Automatically fetch transcripts from YouTube videos
- 📝 **Card Types** - Organize content into YouTube URL cards, Text notes, and Scripts
- 🔍 **Swipe File** - Searchable, filterable library of all saved cards across all boards
- 🎨 **Dark Minimal UI** - Notion meets Figma aesthetic with electric blue accents

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite3
- **YouTube**: youtube-transcript npm package

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/tonybakes529/content-board.git
cd content-board
```

2. Install dependencies
```bash
# Install root dependencies (if using workspaces)
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

3. Create .env file
```bash
cp .env.example .env
```

### Running Locally

In separate terminal windows:

**Terminal 1 - Backend (port 5000)**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (port 3000)**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
content-board/
├── frontend/                 # Vite + React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
├── backend/                  # Express API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── db/              # Database setup
│   │   └── server.ts        # Express server
│   └── package.json
└── README.md
```

## API Endpoints

### Boards
- `GET /api/boards` - List all boards
- `POST /api/boards` - Create a new board
- `PATCH /api/boards/:id` - Update board name
- `DELETE /api/boards/:id` - Delete a board

### Cards
- `GET /api/cards` - Get all cards (or filter by board_id)
- `POST /api/cards` - Create a new card
- `PATCH /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete a card
- `POST /api/cards/:id/duplicate` - Duplicate a card

### Transcripts
- `POST /api/transcripts/fetch` - Fetch YouTube transcript from URL

## Color Palette

- **Background**: #0D0D0D (Dark)
- **Surface**: #1A1A1A
- **Border**: #2A2A2A
- **Text**: #F0F0F0 (Light)
- **Accent**: #3B82F6 (Electric Blue)
- **Accent Hover**: #2563EB

## Font

- **Primary**: Geist (from Google Fonts)
- **Mono**: DM Mono (from Google Fonts)

## Development Notes

- Database file is created automatically at `content-board.db`
- Frontend proxies API requests to backend via Vite config
- YouTube transcripts are fetched client-side on card creation
- All cards have optional thumbnails and previews

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
