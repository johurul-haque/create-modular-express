# create-modular-express
Cheeky name, I know. A scaffolding tool for creating REST APIs using Express and TypeScript. It adheres the modular pattern for structuring the application.

## Installation

Install the package globally

```bash
$ npm install -g create-modular-express
```

Or run the executable directly
```bash
$ npx create-modular-express <opt>
```

## App structure
```bash
├── src
│   ├── main.ts # entry point for the application.
│   └── app.ts # default exports the `app` from express for routing.  
├── config
│   └── index.ts # Exports sanitized, immutable environment objects
├── modules
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── tsconfig.json
```
