# AIR4M FE

Frontend for a Task Management system, built with [Next.js](https://nextjs.org) (App Router) and [Material UI](https://mui.com).

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **UI**: Material UI (MUI) v7, MUI X Data Grid, MUI X Date Pickers, Emotion
- **HTTP Client**: Axios
- **Styling**: Sass, Tailwind CSS
- **Other**: Day.js, [`@n8n/chat`](https://www.npmjs.com/package/@n8n/chat)

## Getting Started

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file at the project root:

```bash
NEXT_PUBLIC_BE_URL=<backend API url>
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Other scripts

```bash
npm run build   # build for production
npm run start   # start the production server
npm run lint    # lint the code with ESLint
```

## Project Structure

```
app/
├── api/            # axios instance and API service layer (e.g. TaskApi, AirApi)
├── common/         # shared constants and config (apiConstant, header, dataTableHeader)
├── component/      # reusable React components (Layout, Header, Modal, ErrorBoundary, etc.)
├── model/
│   ├── entity/     # client-side data models (e.g. PaginateResponse)
│   └── inteface/   # TypeScript interfaces / DTOs
├── style/          # theme and scss files
├── task/           # Task pages (list, create)
├── utils/          # utility functions
└── layout.tsx      # root layout
```

## Main Pages

- `/task` — task list (rendered with DataGrid and pagination)
- `/task/create` — form for creating a new task

## Deploy

The recommended way to deploy is on [Vercel](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
