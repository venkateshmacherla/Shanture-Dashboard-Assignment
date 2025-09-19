## Project Overview
This project is a Sales Analytics Dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js). It demonstrates skills in data aggregation, backend API development, and frontend data visualization. The application provides insights into sales data, including total revenue, average order value, top products, and historical reports over customizable date ranges.

## Features
- Date range filtering of sales data
- Aggregated metrics: total revenue, average order value, total orders
- Top products by sales quantity
- Reports history displaying saved analytics
- Responsive UI built with React and styled-components / Material-UI
- Interactive charts using Apache ECharts
- Backend API built with Express.js and MongoDB aggregation pipelines
- Database seeding with realistic sample data using Faker.js

## Technology Stack
| Layer    | Technology           |
|----------|----------------------|
| Frontend | React, Axios, ECharts|
| Backend  | Node.js, Express.js  |
| Database | MongoDB, Mongoose    |
| Styling  | Material-UI / CSS    |

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
cd backend

text

2. Install dependencies:
npm install

text

3. Start MongoDB server locally:
mongod

text

4. Seed the database with sample data:
node seed.js

text

5. Start the backend server:
npm start

text

### Frontend Setup
1. Navigate to the frontend directory:
cd frontend

text

2. Install frontend dependencies:
npm install

text

3. Start the React app:
npm start

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

text

### Environment Variables
Create a `.env` file in the backend root with the following variable:
MONGO_URI=mongodb://localhost:27017/salesdb
PORT=5000

text

Update the frontend `.env` or API base URL as needed depending on deployment.

## Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── seed.js
│ ├── server.js
├── frontend/
│ ├── src/
│ ├── public/
├── README.md

text

## Database Schema

### Customer
- name (String)
- region (String)
- type (String) // Individual or Business

### Product
- name (String)
- category (String)
- price (Number)

### Sale
- reportDate (Date)
- customer (ObjectId ref Customer)
- product (ObjectId ref Product)
- quantity (Number)
- totalRevenue (Number)
- region (String)

### AnalyticsReport
- startDate (Date)
- endDate (Date)
- totalRevenue (Number)
- totalOrders (Number)
- avgOrderValue (Number)
- topProducts (Array)
- topCustomers (Array)
- regionWiseStats (Object)
- categoryWiseStats (Object)

## API Endpoints

| Method | Endpoint                | Description                      | Params              |
|--------|-------------------------|--------------------------------|---------------------|
| GET    | `/api/revenue`          | Fetch revenue analytics data    | startDate, endDate  |
| GET    | `/api/top-products`     | Fetch top products by sales     | startDate, endDate  |
| GET    | `/api/reports`          | List historical analytics reports | N/A               |

## Usage

- Use the frontend date picker to select a date range.
- Dashboard updates revenue and order metrics in real-time.
- View charts of top products sold in selected range.
- Access historical reports through Report History tab.
