# Storefront Backend
A backend API for StoreFront that interact with PostgreSQL database for users, products, and orders information programmed in TypeScript for JavaScript along with Unit and API routes test with Jasmine.
## Database server (PostgreSQL)
Host=`127.0.0.1`<br/>
Port=`5432`<br/>
DB=`storefront_dev`<br/>
Test_DB=`storefront_test`<br/>
User=`storefront_user`<br/>
Password=`password123`<br/>
### Setting up database server with Docker-Compose
1. Docker: https://docs.docker.com/get-docker/<br/>
2. Docker-Compose: https://docs.docker.com/compose/install/<br/>
3. CLI command: `docker-compose up`
## Backend Server (Express)
Host=`127.0.0.1`<br/>
Port=`3000`<br/>
### Installation Guide
1. Node.js and NPM<br/>
OS X or Windows: [Node.js Installer](https://nodejs.org/en/download/)<br/>
Linux or other OSs: [NodeSource Installer](https://github.com/nodesource/distributions)
2. Yarn: https://classic.yarnpkg.com/en/docs/install/
3. CLI command: `yarn install`
### Commands
- Start: `yarn start`
- Test: `yarn test`
