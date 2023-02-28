
# VT - Challenge



This challenge was developed as a condition to apply for the vacancy of junior full-stack developer for the company Video Translator.

Mayor Technologies: 

DB: PostgreSQL

Backend: TypeScrypt - Node.js - Express.js - Sequelize

Frontend: TypeScrypt - Angular 15 (CLI)
## Installation

first clone this repo using

```bash
  git clone https://github.com/JuanjoPischetz/VT-Challenge.git

```
    
Once clone finish, step on /API and install dependencies 

```bash

  npm install
  
```

Do the same on /Client path.

## Aditional configurations

Before you can run this proyect, you must create .env file on /API folder. 

Add following environments variables to the file :

`PORT = '3001'`

`SECRET_KEY = "ANY_SECRET_KEY"`

`DB_USER=postgres`

`DB_PASSWORD=YOUR_PASSWORD`

`DB_HOST=localhost`

## Run Locally

Now, on /API terminal use:

```bash

  npm start
  
```

Once console shows "listen on PORT" and "Successful" (it means DB conection was  a success)

Then go for /Client terminal and use 

```bash

  ng serve --o
  
```
## Usage

Start using the SPA creating a user and enjoy:

Note: user name starts with admin (lowercase) auto assign admin role, this is important because common users are redirected to ToDo App and admin users are redirected to admin dashboard.