# TTP-FS
My submission for the TTP Stage 2 Full Stack Application Build Assessment

[Demo video](https://drive.google.com/file/d/1b5Ua3u0HdCSDYaidstLuIw0BAwPXHz97/view)

### Front-End Frameworks & Technologies
- React
- Semantic UI
- React Router
- IEX & Cloud IEX APIs

### Back-End Frameworks & Technologies
- Ruby On Rails
- PostgeSQL
- JWT
- BCrypt

### User Stories
Users can:
- Create a new account with a name, email, and password (default cash account balance set as $5000.00 USD; email is validated for uniqueness).
- Authenticate via email and password to access their account.
- Search for and purchase stocks through the marketplace (transactions are only approved if there is enough money in their account, the quantity of shares is a whole number, and the ticker symbol is valid).
- View a list of all transactions made to date.
- View a list of all the stocks owned along with their current values.

### Run Locally on Your Machine
1. Clone repo from GitHub

2. Open two tabs in your terminal with the root of the directory open

3. In the first tab run these commands in order:
- cd ./TTP-back-end
- bundle install
- rails db:create
- rails db:migrate
- rails s

4. In the second tab run these commands in order:
- cd ./ttp-front-end
- yarn (or npm install)
- yarn start (or npm start)
- type y to confirm
- navigate to localhost:3001/login

### * Order Matters!!! Make sure you have PostgeSQL installed on your computer and your Ruby version matches the one listed in the GemFile *
