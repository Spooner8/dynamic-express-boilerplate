# 🚀 Dynamic Express Boilerplate

## 🌟 Overview
This project is a boilerplate for building dynamic **Express.js** applications with **TypeScript**. It comes with a rich set of features, including authentication, database management, monitoring, and more. The project is modular and highly configurable, making it easy to adapt to your needs.

---

## ✨ Features
- **🔒 Authentication**: Local authentication with Passport.js and JWT, plus Google OAuth2.0.
- **🛡️ Role-Based Access Control (RBAC)**: Manage user roles and permissions.
- **🗄️ Database**: PostgreSQL with Prisma ORM for schema and data management.
- **📊 Monitoring**: Prometheus metrics and Grafana dashboards.
- **⚡ Rate Limiting**: Protect your API with express-rate-limit.
- **📜 Logging**: Structured logging with Pino.
- **🐳 Docker Support**: Pre-configured Docker and Docker Compose for deployment.

---

## ⚙️ Configuration Options
Customize the project using environment variables defined in `.env` or `api.env`:

### Authentication
- `USE_GOOGLE_AUTH`: Set to `true` to enable Google OAuth2.0.
- `JWT_SECRET` and `REFRESH_TOKEN_SECRET`: Secrets for signing JWTs.

### RBAC
- `RBAC`: Set to `true` to enable Role-Based Access Control.

### Rate Limiting
- `RATE_LIMITER`: Set to `true` to enable rate limiting.

### Logging
- `LAAS`: Set to `true` to enable Logging as a service. Requires additional repository: [express-logger](https://github.com/Spooner8/express-logger)
- `LOGGER_URL`: Necessary if `LAAS` is set to true
- `LOG_LEVEL`: Set the logging level (e.g., `info`, `debug`).

### Monitoring
- Prometheus and Grafana are enabled by default in the Docker Compose setup.

---

### Metrics Configuration
If the `COLLECT_METRICS` environment variable is set to `false`, you must remove Prometheus and Grafana services from the `docker-compose.yaml` file to avoid unnecessary resource usage. Simply delete or comment out the `prometheus` and `grafana` sections in the file.

---

## 🛠️ Setup Instructions

### Local Deployment

#### 1️⃣ Install Dependencies
```bash
npm install
```

#### 2️⃣ Configure Environment Variables
- Copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- Update the values in `.env` as needed (e.g., `DATABASE_URL` should be set to `localhost` for local development or `db` if the database runs as a container in the stack).

---

### Optional Variables
If the following environment variables are not set, the application will use these default values:

| Variable          | Default Value |
|-------------------|---------------|
| `LIMITER`         | `true`        |
| `LAAS`            | `false`       |
| `COLLECT_METRICS` | `false`       |
| `RBAC`            | `false`       |
| `USE_GOOGLE_AUTH` | `false`       |

---

#### 3️⃣ Set Up Prisma
- Install Prisma CLI:
  ```bash
  npm install -g prisma
  ```
- Generate Prisma client:
  ```bash
  npx prisma generate
  ```
- Apply migrations:
  ```bash
  npx prisma migrate dev --name init
  ```
- Open Prisma Studio to manage your database:
  ```bash
  npx prisma studio
  ```

#### 4️⃣ Ensure Database is Running
You must have a database running locally or use the database-only container provided in the project:
- Start the database-only container:
  ```bash
  docker-compose -f docker-compose.db.yaml up -d
  ```
- Alternatively, ensure your local PostgreSQL instance is running and matches the `DATABASE_URL` in `.env`.

#### 5️⃣ Start the Server
```bash
npm run dev
```

---

### Docker Deployment

#### 1️⃣ Build and Start Containers
Run the following command to start the application in detached mode:
```bash
docker-compose up -d --build
```

#### 2️⃣ Database-Only Setup
If you only need the database, use:
```bash
docker-compose -f docker-compose.db.yaml up -d
```

#### 3️⃣ Stop Containers
To stop the running containers:
```bash
docker-compose down
```

---

## 📚 Tools and Features

### Prisma
Prisma is used as the ORM for database management. Here are some useful commands:
- Initialize Prisma:
  ```bash
  npx prisma init
  ```
- Generate Prisma client:
  ```bash
  npx prisma generate
  ```
- Apply migrations:
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```
- Open Prisma Studio:
  ```bash
  npx prisma studio
  ```

### Prometheus
Prometheus is used for monitoring and metrics collection. Metrics are exposed at `/metrics`.
- Configuration file: `prometheus.yml`
- Access Prometheus at: [http://localhost:9090](http://localhost:9090)

### Grafana
Grafana is used for visualizing metrics collected by Prometheus.
- Access Grafana at: [http://localhost:3100](http://localhost:3100)
- Add Prometheus as a data source in Grafana.

### Rate Limiter
The rate limiter is configured to allow 500 requests per 15 minutes by default. You can adjust this in `src/middleware/rate-limiter.ts`.

### Logger
If LAAS (Logger as a service) is set to true, you have to run the service [express-logger](https://github.com/Spooner8/express-logger)

---

## 🛠️ Extensibility
The API has been designed to allow easy integration of additional services, such as a cache database or other utilities. This is achieved through the use of server roles and an `if` block, which control the activation or deactivation of such services. To add new services, update the relevant configuration files and the code in `src/server.ts`.

---

## 🛠️ Customization
- Modify `src/services/api.ts` to add or remove routes.
- Update `prisma/schema.prisma` to change the database schema.
- Use environment variables to enable or disable features as needed.

---

## 🚀 Deployment
- Ensure all environment variables are set correctly.
- Use `docker-compose.yaml` for production deployment.
- Monitor the application using Prometheus and Grafana.

---

## 📜 License
This project is licensed under the MIT License.