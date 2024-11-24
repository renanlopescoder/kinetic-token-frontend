# Kinetic Token Watchlist - Frontend

This repository contains the frontend application for the **Token Watchlist**. Built with **Next.js**, **TypeScript**, it allows users to view token information, manage their watchlist, and interact with the backend API.

## Features

- Display detailed token information:
    - Name, symbol, price, market cap, and 24h price change.
- User registration and authentication with session persistence.
- Add/remove tokens to/from a personalized watchlist.
- Modern design using **Tailwind CSS**.
- Data fetching and caching with **React Query** for smooth interactions and cache.

## Technologies Used

- **Next.js**: Server-side rendering and static site generation.
- **TypeScript**: For type-safe development.
- **React Query**: For API interaction and state management.
- **Tailwind CSS**: For rapid styling and responsive design.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (>= 18.x)
- **npm** (or **yarn**)

### Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/renanlopescoder/kinetic-token-frontend.git
    cd kinetic-token-frontend
   ```
2. Install dependencies
    ```bash
     yarn
    ```

3. Required env vars
    ```bash
     NEXT_PUBLIC_API_URL=http://localhost:8080
    ```
4. Start Application
    ```bash
     yarn dev
    ```
