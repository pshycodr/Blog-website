# Blog Web Platform

A full-stack blogging platform built with React, TypeScript, and Cloudflare Workers, featuring user authentication and blog post management.

🚀 **Live Demo**: [Blog Web Platform](https://blog-website-one-mauve.vercel.app/)

## Project Structure

The project is organized into three main components:

- `Frontend/`: React TypeScript application (deployed on Vercel)
- `Backend/`: Cloudflare Workers API
- `Common/`: Shared TypeScript types and validation schemas

## Features

- User authentication (signup/signin)
- Create and publish blog posts
- Draft management
- Personal dashboard
- Responsive design
- Real-time blog post updates

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Axios

### Backend
- Cloudflare Workers
- Hono (Backend Framework)
- Prisma (ORM)
- PostgreSQL
- JWT Authentication

### Common
- Zod (Schema Validation)
- TypeScript

### Deployment
- Frontend: Vercel
- Backend: Cloudflare Workers
- Database: PostgreSQL

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install Common package dependencies:
```bash
cd Common
npm install
```

3. Install Backend dependencies:
```bash
cd Backend
npm install
```

4. Install Frontend dependencies:
```bash
cd Frontend
npm install
```

### Development

1. Start the Backend development server:
```bash
cd Backend
npm run dev
```

2. Start the Frontend development server:
```bash
cd Frontend
npm run dev
```

### Deployment

1. Deploy the Backend to Cloudflare Workers:
```bash
cd Backend
npm run deploy
```

2. Build and deploy the Frontend to Vercel:
```bash
cd Frontend
npm run build
```

## Environment Variables

### Backend
Create a `wrangler.toml` file with:
```toml
[vars]
DATABASE_URL=""
JWT_SECRET=""
```

### Frontend
Update `src/config.ts` with your backend URL:
```typescript
export const BACKEND_URL = "your-backend-url"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues and pull requests.
