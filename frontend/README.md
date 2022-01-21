# Front End

Go to `frontend` directory, install dependencies and start the project. It created using [Next.js](https://nextjs.org/)

First you will need to create `.env` file, you can check `.env-example` file for sample configuration.

## .env File
```
NEXT_PUBLIC_AUTH0_DOMAIN=dev-x2a0z7ur.us.auth0.com
NEXT_PUBLIC_AUTH0_AUDIENCE=book-store
NEXT_PUBLIC_AUTH0_CLIENT_ID=j275lw7SrTrLqMkGNIglBe30K8thioBv
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_BACKEND_URI=http://127.0.0.1:5000
```

As you seen in the commands above, top 4 lines is about how to setup authentication from [Auth0](https://auth0.com/), you might make use of example config or set your custom one.

After create `.env` file, you can start development server by using the following commands:

```bash
cd frontend
yarn # or npm install
yarn dev # or npm run dev
```