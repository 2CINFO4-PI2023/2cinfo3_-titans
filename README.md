[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11279931&assignment_repo_type=AssignmentRepo)

run on docker:
docker compose up --build -d

to run it on docker edit DATABASE_URI change 127.0.0.1 avec mongodb(container name) et REDIS_URL change 127.0.0.1 avec redis (container name)

dont forget to create .env file with the following content
SERVER_PORT=9090
DATABASE_URI=mongodb://127.0.0.1:27017/pureplates
REDIS_URL=redis://127.0.0.1:6379
TOKEN_SECRET=<RANDOM STRING>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_PASSWORD= generate yout owen app passwords https://support.google.com/accounts/answer/185833?hl=en
SMTP_USERNAME=<your_email@gmail.com>
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_APP_CALLBACK_URL=http://localhost:9090/auth/facebook/callback
GOOGLE_APP_CALLBACK_URL=http://localhost:9090/auth/google/callback
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SESSION_SECRET=
ADMIN_PASSWORD=
ADMIN_USERNAME=
NUTRITION_API_URI=https://api.calorieninjas.com/v1/nutrition
NUTRITION_API_KEY= generate your own key from here https://calorieninjas.com/register by registring then login then click show key more documentation is here https://calorieninjas.com/api
