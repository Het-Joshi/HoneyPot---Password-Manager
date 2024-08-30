
---

# Honeypot Project

## Overview

This honeypot is designed to simulate various administrative and system paths to attract and log unauthorized access attempts. It serves different pages based on the requested path, including a login page, server status, API data, and system information. It also logs interactions, including form submissions, to help analyze potential security threats.

## Features

- **Dynamic Paths:** Handles various paths to simulate a real admin dashboard and system status.
- **Logging:** Logs all interactions, including POST request body data and general access details.
- **Form Handling:** Includes form logging to capture data submitted through the login form.
- **Error Handling:** Provides a custom 404 page for unknown paths.

## Prerequisites

- Node.js (>= 12.x)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Het-Joshi/HoneyPot_Password-Manager.git
   cd HoneyPot_Password-Manager
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   Create a `.env` file in the root directory to define environment variables:

   ```env
   PORT=3000
   RESULT_FILE=log.txt
   ```

   - `PORT`: Port number for the server.
   - `RESULT_FILE`: File to store log data.

## Usage of V2

1. **Start the Server**

   ```bash
   npm start
   ```

   By default, the server will run on port 3000. You can access it at `http://localhost:3000`.

2. **Access the Application**

   - **Root Path (`/`)**: Displays `index.ejs`.
   - **Login Path (`/login`)**: Displays a login form.
   - **Server Status Path (`/server-status`)**: Displays server status information.
   - **API Data Path (`/api/v1/data`)**: Shows sample API data.
   - **Admin Panel Path (`/access`)**: Lists users and system logs.
   - **Security Alerts Path (`/alerts`)**: Shows security alerts.
   - **System Info Path (`/config`)**: Displays system information.
   - **404 Path**: Handles unknown paths.

## Logging

- All incoming requests and their details are logged to the file specified in the `RESULT_FILE` environment variable.
- Form submissions are logged, including the data entered by users.
- Also logs IP using the `X-Forwarded-For` header

## Directory Structure

- **`views/`**: Contains EJS templates.
  - `index.ejs`: Template for the root path.
  - `user.ejs`: Template for dynamic paths and 404 handling.
- **`public/`**: Contains static files like CSS and JavaScript.
- **`app.js`**: Main server file.

## License

This project is licensed under the [MIT License](LICENSE).


