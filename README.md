[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11279931&assignment_repo_type=AssignmentRepo)

run:
docker-compose up

dont forget to create .env file with the following content
SERVER_PORT=9090
DATABASE_URI=mongodb://127.0.0.1:27017/pureplates
TOKEN_SECRET=<RANDOM STRING>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_PASSWORD= generate yout owen app passwords https://support.google.com/accounts/answer/185833?hl=en
SMTP_USERNAME=<your_email@gmail.com>