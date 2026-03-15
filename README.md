# 📚 Study Tracker

A personal study tracking application built with React, TypeScript, and Material UI.

## Features

- 📝 Add study entries with subject, topic, hours, date and rich text notes
- 🗂️ Pre-populated subject and topic lists with add/delete support
- 📊 Dashboard with stats, progress bars, and most-studied subject
- ✏️ Inline editing of entries with a full rich text editor
- 🌙 Dark/light mode toggle
- 💬 Motivational quote banner with refresh
- 🔍 Filter entries by subject across dashboard and entry list
- 💾 Data persisted in localStorage — no backend required

## Tech Stack

| Layer         | Technology                    |
| ------------- | ----------------------------- |
| UI            | React 18, Material UI v5      |
| Language      | TypeScript                    |
| Routing       | React Router v6 (Data Router) |
| Data Fetching | TanStack Query                |
| Rich Text     | Tiptap                        |
| State         | React Context                 |
| Storage       | localStorage                  |
| Testing       | Vitest, React Testing Library |
| CI/CD         | GitHub Actions → GitHub Pages |

## Architecture Overview

```
src/
├── shared/          # Shared across the whole app
│   ├── types/       # All TypeScript interfaces and types
│   ├── context/     # React Context providers (Theme, Filter, Subjects)
│   ├── storage/     # localStorage read/write functions
│   └── components/  # Shared UI components (RichTextEditor)
├── features/        # Feature-based modules (modlets)
│   ├── addEntry/    # Add study entry form
│   ├── dashboard/   # Stats and progress dashboard
│   ├── entryList/   # Entry list with inline editing
│   └── quote/       # Motivational quote banner
├── api/             # Standalone async API functions
├── layout/          # RootLayout with nav and quote banner
├── App.tsx          # Route outlet + shared entry state
└── main.tsx         # Router, providers, app entry point
```

## State Management

| State               | Location                     | Reason                                 |
| ------------------- | ---------------------------- | -------------------------------------- |
| Entries             | `App.tsx`                    | Needs to be shared across all routes   |
| Dark/light theme    | `ThemeModeProvider` (root)   | MUI ThemeProvider must wrap everything |
| Subject filter      | `FilterProvider` (partial)   | Only needed by Dashboard + EntryList   |
| Subject/topic lists | `SubjectsProvider` (partial) | Only needed by AddEntry                |

## Getting Started

```bash
npm install
npm run dev
```

## Running Tests

```bash
npm test
```

## Linting and Formatting

```bash
npm run lint
npm run format
```

## Deployment

Pushes to `main` automatically run tests, lint, and deploy to GitHub Pages via GitHub Actions.
Live site: https://Shafeen-Noor.github.io/study-tracker/
