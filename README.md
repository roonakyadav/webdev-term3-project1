# Blood Donor Finder

A React-based application to help find and request help from blood donors. This project uses [Vite](https://vite.dev/) for a fast development experience.

## Features

- **Donor List**: Fetches donor data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) and assigns random blood groups and availability.
- **Filter by Blood Group**: Easily filter donors based on their blood type (A+, B+, O+, AB+, A-, B-, O-, AB-).
- **Search by City**: Find donors in your specific city using the search bar.
- **Sort by Availability**: Sort the donor list to show available donors first.
- **Request Help**: Request assistance from available donors. The button will be disabled once a request is sent or if the donor is busy.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster development experience for modern web projects.
- **CSS**: Custom styling for the application layout and donor cards.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) (usually comes with Node.js).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd webdev-term3-project1
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
