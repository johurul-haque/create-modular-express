<h1 align="center">
create-modular-express
</h1>

<p align="center">
Lightweight bootstraper for setting up express application with typescript.
</p>

## Getting started

```bash
npx create-modular-express
```
Optionally, you can add a period `.` at the end to use the current directory to scaffold the project.

### Scripts
After installing all of the dependencies change the `.env.example` file `.env` and add the necessary variables.

Now you can use the following commands to spin up your app
> ⚠️ Only use npm for this

```bash
# dev server
npm run dev

# production build
npm run build

# running in production
npm start
```

## Tech stack
- **Express.js** - Route handling and middlewares
- **TypeScript** - Static type checking
- **Zod** - Validating and parsing incoming data and inferring types
- **Mongoose** - Data modeling and query building
- **MongoDB** - Storing and managing data

## Features overview
- **Modular pattern** - The application adheres the modular pattern. With each module having six necessary files. Use [this tool](https://www.npmjs.com/package/write-module) for quickly creating those files.
  
- **Aliases** - Configured with import aliases `(@/*)` while making sure the absolute paths gets resolved to relative paths during build time.
  
- **AppError** - Extended class of the `Error` constructor for adding the status code parameter.
- **Catch Async** - An utility function that wraps asynchronous route handlers. Ensuring proper error handling by forwarding any errors to the Express error-handling middleware.
- **Validate Request** - Validates incoming requests against a specified Zod schema for request bodies. If the validation succeeds, it allows the request to proceed; otherwise, it handles errors asynchronously.
- **Global Catch** - Error handling middleware which catches all possible errors and sends a response with a standard format.
- **Deployment** - Comes with vercel configuration to just easily deploy on vercel using the CLI.
- **Most importantly** - Just delete what you don't need 🕶️
