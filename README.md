# create-modular-express
Lightweight project bootstraper for starting up an express application with typescript.

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

## Features Overview
- **Modular pattern** - The application adheres to the modular pattern. With each module having six necessary files. Use [this tool](https://www.npmjs.com/package/write-module) to quickly generate those files.
  
- **import alias** - Comes pre-configured with `(@/*)`. Also ensures the absolute paths get resolved to relative paths during build time.
- **AppError** - Extended class of the `Error` instance for adding an extra status code parameter.
- **catchAsync** - Utility function for wrapping asynchronous route handlers—ensuring proper error handling by forwarding any errors to the Express error-handling middleware.
- **validateRequest** - Middleware function, expects any zod schema as arguments. Validates incoming requests against a specified Zod schema for request bodies. If the validation succeeds, it allows the request to proceed; otherwise, it handles errors asynchronously.
- **globalCatch** - Error handling middleware that catches all possible errors and sends a response with a standard format.
- **Deployment** - Comes with Vercel configuration to just easily deploy on Vercel using the CLI.
- **Most importantly** - Delete what you don't need 🕶️
