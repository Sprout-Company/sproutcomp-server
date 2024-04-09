
# SproutComp Server 

[![Webpack testing](https://github.com/Sprout-Company/sproutcomp-server/actions/workflows/webpack.yml/badge.svg)](https://github.com/Sprout-Company/sproutcomp-server/actions/workflows/webpack.yml)
[![Website status](https://github.com/Sprout-Company/sproutcomp-server/actions/workflows/website_request.yml/badge.svg)](https://github.com/Sprout-Company/sproutcomp-server/actions/workflows/website_request.yml)

About
-----

This repository contains the source code for the SproutComp server. The server is built using Node.js and Express, and it uses a private MongoDB database host for data storage. 
The server is responsible for handling user authentication and data persistence.

Setup
-----

1. Install dependencies and client dependencies:

   ```bash
   npm install 
   npm run client_install
   ```

2. Create a `.env` file using the `.env.example` file as a template, or use another environment variable setter.

3. Run the project:

   ```bash
   npm run dev
   ```

Production
----------

To prepare the app for production, run:

```bash
npm run build
```

Then, to start the production server, run:

```bash
npm start
```

-----
Made with ❤️ by the SproutComp team.