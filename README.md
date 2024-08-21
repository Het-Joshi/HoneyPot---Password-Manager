# Honeypot Password Manager

## Overview

The Honeypot Password Manager is a simulated web application designed to attract and capture malicious activities, especially those targeting password management systems. This project showcases various security traps and logging mechanisms to detect and analyze potential threats. It features a modern UI, basic authentication, file upload capabilities, and simulated API endpoints, all crafted to observe and log suspicious interactions.

The application is meant to be hosted via a tool like Ngrok to expose it to the internet, allowing you to see if hackers or bots are able to discover and interact with the honeypot URL.

## Features

![image](https://github.com/user-attachments/assets/ff84e104-3b52-4642-9e78-60b97bc5f5d5)
![image](https://github.com/user-attachments/assets/e0475d54-107f-41ec-ac66-048d73ed2238)
![image](https://github.com/user-attachments/assets/84451528-ea6e-4559-8cd8-14f3476efe32)



- **Simulated Login and Admin Panel**: Allows users to attempt login with various credentials and access a simulated admin panel.
- **File Upload Capability**: Users can upload files, which are logged for analysis.
- **Search Page**: A dynamic trap designed to simulate SQL injection vulnerabilities.
- **API Endpoints**: Simulated API endpoints for users and data manipulation.
- **Logging**: Captures detailed logs of user interactions, including IP addresses, credentials used, and API calls.

## Prerequisites

- Node.js and npm installed on your local machine.
- Ngrok or a similar tunneling tool to expose the application to the internet.

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

3. **Start the Application**

   ```bash
   node app.js
   ```

   The application will be accessible at `http://localhost:3000`.

4. **Expose the Application Using Ngrok**

   - Install Ngrok if you haven't already: [Ngrok Installation](https://ngrok.com/download)
   - Run Ngrok to expose the local server:

     ```bash
     ngrok http 3000
     ```

   - Ngrok will provide a public URL that you can share or monitor to observe interactions with the honeypot.

## Project Structure

- **`app.js`**: Main server file where the Express app is configured.
- **`views/`**: Contains EJS templates for rendering pages.
  - `index.ejs`: Home page with login form.
  - `dashboard.ejs`: Dashboard for logged-in users.
  - `admin.ejs`: Admin login page.
  - `admin-dashboard.ejs`: Admin dashboard.
  - `upload.ejs`: File upload page.
  - `search.ejs`: Dynamic SQL injection trap page.
- **`public/`**: Directory for static assets (e.g., CSS files).
- **`styles.css`**: Main stylesheet for styling the application.

## Deployment

1. **Run Ngrok to Expose Your Local Server**

   - Install Ngrok if you haven't already: [Ngrok Installation](https://ngrok.com/download)
   - Run Ngrok to expose the local server:

     ```bash
     ngrok http 3000
     ```

   - Ngrok will provide a public URL that you can share or monitor.

2. **Other info**
   - Admin page credentials: `admin` , `password`
   - Default credentials: Dosent matter. all lead to same dashboard.
   - Search page will show api urls when attempted to sql inject.

## Security Considerations

- This application is a honeypot and should not be used in a production environment.
- Ensure proper security measures are taken on the server to avoid real vulnerabilities.

## Contributing

Contributions to this project are welcome. Please open an issue or submit a pull request on GitHub if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
