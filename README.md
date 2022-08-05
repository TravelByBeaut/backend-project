## To Clone This Repo:

You will need to add a .env.development and .env.test file as these are git ignored. In them, you will need to add PGDATABASE= and the relevant database names which can be found in the setup.sql file.

## To Open The Hosted Version:

https://emily-news-app.herokuapp.com/api

## Summary

This project uses data from articles, comments, users and topics tables within the nc_news database to add, remove and update information using ids.

## Instructions

1. On GitHub, copy the code and use git clone to clone the repository via the command line.
2. Install the dependencies within the package.json file in order to run the files.
3. The database is automatically seeded before each test and within setup.sql.
4. Run tests using jest with the command npm test and the relevant file.

## .env

There are two .env files which are git ignored so you will need to add these in with the information of PGDATABASE=nc_news in the development file and PGDATABSE=nc_news_test in the test file. These are within the main folder and not in any sub-folders.

## Versions

Node = 18.2.0
Postgres = 8.11.0
