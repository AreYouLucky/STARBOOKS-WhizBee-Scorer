# STARBOOKS WhizBee Scorer

STARBOOKS WhizBee Scorer is a real-time quiz scoring and leaderboard application. It uses Laravel and MySQL for the application and data layer, React with Inertia.js for the interface, and Socket.IO for live score updates between connected screens.

## Technology stack

- PHP 8.1 or newer
- Laravel 10
- MySQL or MariaDB
- React 18 and Inertia.js
- Vite 5
- Node.js 20.6 or newer
- Socket.IO 4

## Requirements

Install the following before setting up the project:

- [PHP](https://www.php.net/) 8.1+
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) 20.6+
- MySQL 8+ or a compatible MariaDB version
- Git

The Socket.IO startup script uses Node's `--env-file` option, so Node.js 20.6 or newer is required.

## Installation

### 1. Get the source code

```bash
git clone <repository-url>
cd STARBOOKS-WhizBee-Scorer
```

If the project is already on your computer, open a terminal in its root directory instead.

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend and Socket.IO dependencies

```bash
npm install
npm install --prefix socket-server
```

If PowerShell reports that `npm.ps1` cannot be loaded because script execution is disabled, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd install --prefix socket-server
```

### 4. Create the environment file

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS or Linux:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

### 5. Configure MySQL

Create an empty database, for example:

```sql
CREATE DATABASE starbooks_whizbee;
```

Update the database section in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=starbooks_whizbee
DB_USERNAME=root
DB_PASSWORD=
```

Use the username and password for your local MySQL installation.

### 6. Configure Socket.IO

For development on one computer, use:

```env
APP_URL=http://127.0.0.1:8000
VITE_SOCKET_URL=http://127.0.0.1:3001
SOCKET_HOST=127.0.0.1
SOCKET_PORT=3001
SOCKET_CORS_ORIGIN=*
```

For access from other computers on the same network, replace `192.168.1.24` below with the server computer's current IPv4 address:

```env
APP_URL=http://192.168.1.24:8000
VITE_SOCKET_URL=http://192.168.1.24:3001
SOCKET_HOST=0.0.0.0
SOCKET_PORT=3001
SOCKET_CORS_ORIGIN=*
```

On Windows, find the current address with:

```powershell
ipconfig
```

Look for `IPv4 Address` under the active network adapter. For production, replace the wildcard CORS setting with the exact trusted application origin.

### 7. Create and seed the database

```bash
php artisan migrate --seed
```

This creates the required tables, initial event state, participant data, and the default administrator account.

Default seeded login:

```text
Username: starbooks
Password: Starbooks@2025
```

Change this password before using the application in a public or production environment.

## Startup

The development environment requires three running processes. Open three terminals in the project root directory.

### Terminal 1: Laravel application

```bash
php artisan serve
```

### Terminal 2: Vite frontend

```bash
npm run dev
```

### Terminal 3: Socket.IO server

```bash
npm run socket
```

On a Windows system that blocks `npm.ps1`, use:

```powershell
npm.cmd run dev
npm.cmd run socket
```

Open the application at [http://127.0.0.1:8000](http://127.0.0.1:8000).

To make Laravel and Vite reachable by other devices on the local network, start them with:

```bash
php artisan serve --host=0.0.0.0 --port=8000
npm run dev -- --host=0.0.0.0
```

Other devices can then open `http://<server-ip>:8000`. Make sure ports `8000` and `3001` are permitted through the server computer's firewall.

## Verify the Socket.IO server

After running `npm run socket`, open:

```text
http://127.0.0.1:3001/health
```

A healthy server returns:

```json
{"status":"ok"}
```

Expected terminal output:

```text
Socket.IO server running on http://127.0.0.1:3001
Listening on 127.0.0.1:3001
```

## Production frontend build

Create optimized frontend assets with:

```bash
npm run build
```

The Laravel application and Socket.IO server still need to run behind suitable production process managers and a web server. Set `APP_DEBUG=false`, use secure production credentials, restrict `SOCKET_CORS_ORIGIN`, and serve the application over HTTPS/WSS.

## Useful commands

```bash
# Clear cached Laravel configuration after changing .env
php artisan optimize:clear

# Run Laravel tests
php artisan test

# Build frontend assets
npm run build

# Start only the Socket.IO server from the root directory
npm run socket
```

## Troubleshooting

### `EADDRNOTAVAIL` when starting Socket.IO

The address in `VITE_SOCKET_URL` or `SOCKET_HOST` does not belong to this computer. For local-only use, set both hosts to `127.0.0.1`. For LAN use, set `VITE_SOCKET_URL` to the computer's current IPv4 address and `SOCKET_HOST=0.0.0.0`.

### `EADDRINUSE` on port 3001

Another process is already using the Socket.IO port. Stop the existing process or choose another port, updating both values:

```env
VITE_SOCKET_URL=http://127.0.0.1:3002
SOCKET_PORT=3002
```

### The application loads but live updates do not work

- Confirm that `npm run socket` is still running.
- Check `http://127.0.0.1:3001/health`.
- Confirm that `VITE_SOCKET_URL` is reachable from the browser's computer.
- Restart Vite after changing any `VITE_` environment variable.
- Check that the firewall permits the configured socket port.

### Laravel reports a database connection error

Confirm that MySQL is running, the database exists, and the `DB_*` values in `.env` are correct. Then clear cached configuration:

```bash
php artisan optimize:clear
```

## Main application pages

- `/` — login
- `/dashboard` — application dashboard
- `/score` — scoring interface
- `/leaderboards` — live leaderboard
- `/finalist` — finalist management

All pages except login require authentication.

## Project structure

```text
app/                Laravel application code
database/           Migrations and seeders
resources/js/       React and Inertia.js interface
routes/              Web and scoring routes
socket-server/       Socket.IO server and dependencies
package.json         Frontend and root startup scripts
```

## License

This project is built on the Laravel framework, which is licensed under the [MIT License](https://opensource.org/licenses/MIT).
