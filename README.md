# Booking

Project for apartment sharing & booking

## Instalation

These instructions will help you get a copy of the project and run it on your local machine for development and testing.

1. Clone the project

```bash
git clone https://github.com/KarpAAA/React-App-2
```

2. Add booking_backend/.env for configuring database

```bash
DATABASE_HOST=postgres(for docker) | localhost(for local)
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
DATABASE_NAME=booking_db
DATABASE_PORT=5432
```

3.Up docker-compose file
```bash
docker-compose up
```

4.Read more about the project<br><br>
I would like to tell a little about my project for better understanding.<br>
On the front, I used Redux together with RTKquery to interact with the backend.<br>
In the program, I used PostgreSQL working through TypeORM.<br>
In my program, authorization is implemented using JWT.<br>
CASL is used to access resources by role.<br>
The class-validator library was used for validation at the level of input parameters.<br>
I save photos of the apartments directly in the program (in the database, only links to the statics that the backend will provide).
