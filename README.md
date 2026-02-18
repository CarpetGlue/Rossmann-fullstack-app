# Rick and Morty Episodes – Full Stack Trial Task

This project is a full-stack application built as a developer trial task.
It fetches episode and character data from the public Rick and Morty GraphQL API,
stores it in a relational database, and displays the saved data in a paginated,
sortable and filterable UI.

## Tech Stack

### Backend

![PHP](https://img.shields.io/badge/PHP-429044?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-429044?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-429044?style=for-the-badge&logo=mysql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-429044?style=for-the-badge&logo=graphql&logoColor=white)

### Frontend

![React](https://img.shields.io/badge/React-429044?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-429044?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-429044?style=for-the-badge&logo=vite&logoColor=white)


## Features

- Fetch episodes and related characters from GraphQL API
- Store normalized data in relational database
- Many-to-many relationship between episodes and characters
- Console command for data import
- REST API for episode listing
- Pagination, sorting and filtering
- React + TypeScript frontend

## Project Structure

```text
├── rick-morty-backend/ (Laravel)
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── artisan
├── rick-morty-frontend/ (Vite + React)
│   ├── src/
│   └── vite.config.ts
├── schema.sql
└── README.md
```
---

## Backend Setup

Requirements:
- PHP 8.4+
- Composer
- MySQL or MariaDB

### Clone repository:

```bash
git clone https://github.com/CarpetGlue/Rossmann-fullstack-app.git
cd rick-morty-backend
```

### Install dependencies:

```bash
composer install
```

### Environment configuration:

```bash
cp .env.example .env
php artisan key:generate
```

### Edit .env:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rick_morty
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

### Create database:

```sql
mysql -u root -p
CREATE DATABASE rick_morty CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Run migrations:

```bash
php artisan migrate
```

## Import Data from Rick and Morty API

### Run the import command:

```bash
php artisan rickmorty:import
```

This command:
- Fetches all episodes using GraphQL
- Fetches characters for each episode
- Stores data in the database

## API Endpoints

### GET /api/episodes

Query parameters:
- page
- name
- date_from
- date_to
- sort (name, air_date)
- direction (asc, desc)

Example:

```bash
curl "http://localhost:8000/api/episodes?name=Pilot&sort=air_date&direction=desc"
```

## Frontend Setup

### Requirements:
- Node.js 18+
- NPM

Navigate to frontend:

```bash
cd ../rick-morty-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
touch .env
```

Add the following variable:  

`VITE_API_URL=http://localhost:8000/api/episodes`

Start dev server:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

## CORS Configuration

config/cors.php:  
> `allowed_origins = http://localhost:5173`

## Database Schema

See **schema.sql** for full database definition.

Tables:
- episodes
- characters
- character_episode

## Time tracking

Work was tracked via incremental Git commits. Estimated time spent per major task:

| Task | Approx. Time |
|-----|--------------|
| Project setup & configuration (Laravel, DB, tooling) | 2h |
| Backend structure (migrations, models, relationships) | 2h |
| GraphQL service & import command | 2.5h |
| API endpoints (episodes with characters, filtering, pagination) | 1h |
| React + TypeScript frontend development | 4h |
| Frontend API layer & type definitions | 1h |
| Bug fixes & UI polish | 1h |
| **Total** | **~15h** |


## Notes

- UI is intentionally minimal
- Focus is on functionality and data handling
- GraphQL is used only for ingestion, REST for frontend consumption