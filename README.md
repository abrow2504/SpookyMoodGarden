# Mood Garden

A hauntingly beautiful mood tracking application where your emotions bloom into an enchanted gothic garden. Log your feelings and watch them transform into ethereal plants and floating spirits animated by your emotional landscape.

## Features

- **Mood Logging** - Track five emotional states: Joyful, Melancholy, Anxious, Enraged, and Lonely
- **Interactive Garden** - Watch your moods manifest as animated plants growing in a mystical garden
- **AI Narration** - Receive personalized, gothic-inspired reflections on your emotional patterns
- **User Authentication** - Secure login and profile management
- **Mood History** - View your complete mood timeline with personal notes
- **Whimsical Effects** - Sparkle cursor effects and floating atmospheric lights
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gothic-mood-garden
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env.local` (or `.env`) and fill in your secrets:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_ORACLE_URL=https://your-proxy-host
   VITE_OPENAI_API_KEY=sk-...
   ```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot module reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Firebase** - Authentication and Firestore database
- **CSS** - Custom styling with gothic aesthetic

## Project Structure

```
src/
├── components/
│   ├── AuthModal.tsx      # Login/signup interface
│   ├── Garden.tsx         # Mood visualization
│   ├── MoodEntry.tsx      # Mood logging form
│   ├── Narration.tsx      # AI-generated reflections
│   ├── FloatyLights.tsx   # Ambient effects
│   └── UserButton.tsx     # User profile menu
├── context/
│   └── AuthContext.tsx    # Authentication state management
├── hooks/
│   └── useNarration.ts    # Narration hook
├── App.tsx                # Main application
└── firebase.ts            # Firebase configuration
```

## How It Works

1. **Sign In** - Create an account or log in with your credentials
2. **Log Mood** - Select a mood and optionally add a personal note
3. **Watch Garden Grow** - Your mood entries manifest as plants in the garden
4. **Get Insights** - Read AI-generated narration reflecting your emotional journey
5. **Track Over Time** - Access your complete mood history with timestamps


## License

This project is open source and available under the MIT License.
