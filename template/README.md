## Getting Started
After installing all of the dependencies change the `.env.example` file `.env` and add the necessary variables.

Now you can use the following commands to spin up your app.
> ⚠️ Only use npm for this
```bash
# dev server
npm run dev

# production build
npm run build

# running in production
npm start
```

After starting the dev server run the following command to check if it's working

```bash
curl http://localhost:8080/api/
```

This should send back the following response:
```
{"message":"Hello word!"}
```
