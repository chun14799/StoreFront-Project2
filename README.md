# Storefront Backend Project
###
1. You need to install dependencies of project by using `npm i` 
2. **Set Up PostgreSQL**:
   Create a PostgreSQL database with the following credentials or adjust as needed:
   - **Database**: postgres
   - **Username**: postgres
   - **Password**: udacity_password

   In my case, I created new database: 
   - **Database**: udacity
   - **Username**: udacity_user
   - **Password**: udacity_password

3. Then, create required databases , both have the same account to login : 
    - database for dev : using SQL : CREATE DATABASE udacity;
    - database for test : using SQL : CREATE DATABASE udacity_db_test;
4. Then do the migration by using `db-migrate up` , it will help you create 4 tables that used in project. It's depend on the ENV environment variable that help you choose the data you will working on. By default , it has value "dev" that means you will work on dev database (udacity).

5. To see the testing , please run `npm run test` and review the out put of testing :
    this command will use the test database to do the testing, you can see the command set ENV variable to test in package.json.

6. To run the application with dev mode, please try with `npm run watch` will start the dev and use postman to test endpoints.
7. PORT that backend running is on localhost:3000 and db is localhost:5432
8. Folder middle has the authenticate method to check the token.
###
I have add one middleware for checking token in the folder middleware.
I'm using the 2 database and when you run the command db-migrate up , those databases will be created.
# Environment variable are : 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=udacity
POSTGRES_USER=udacity_user
POSTGRES_PASSWORD=udacity_password
POSTGRES_DB_TEST=udacity_db_test
BCRYPT_PASSWORD=udacity-bcrypt
SALT_ROUND=5
SECRET_TOKEN=helloUdacity!
ENV=dev
```