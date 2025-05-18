# News Portal

A responsive news portal built with React frontend and .NET backend, featuring interactive news sliders, weather forecasts, finance menus, and sticky advertisements.

## Deployment

- **Frontend**: https://ata-news.vercel.app
- **Backend**: https://news-web.azurewebsites.net/swagger/index.html

## Tech Stack

### Backend
- **.NET Web API**: Backend API framework
- **SQLite**: Local database
- **Entity Framework Core**: ORM for database operations

### Frontend
- **React**: Frontend framework
- **Redux**: State management for history tracking
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **shadcn-ui**: Component library
- **prd.place**: Placeholder images


## Installation and Setup

### Backend (.NET)

```bash
# Navigate to the backend directory
cd NewsAPI

# Build the project
dotnet build

# Run the API
dotnet run
```

### Frontend (React)
```bash
# Navigate to the frontend directory
cd NewsWeb

# Install dependencies
npm install

# Start development server
npm run dev
```


## API Endpoints

- `/api/news` - Get news articles for slider
- `/api/finance` - Get finance menu items
- `/api/weather` - Get 5-day weather forecast
- `/api/ads` - Get advertisement data

## Project Structure

### Backend Structure
- `/Controllers` - API endpoint controllers
- `/Models` - Data models
- `/Data` - Database context and migrations

### Frontend Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/store` - Redux store configuration
- `/src/services` - API service functions
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions
