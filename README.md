This is a [React.js](https://react.dev/) project using TypeScript bootstrapped with [`vite`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Getting Started

First, install all dependencies:
```bash
yarn install
``` 
If you need to install yarn, please refer to this [link](https://yarnpkg.com/getting-started/install)

To run this code, you also need to clone the code for the [backend](https://github.com/yeouvi29/backend-guild-pt-react-be)

Before start the server, create **.env** file on the root directory.
In the file, add `VITE_API_URL=http://localhost:8000`

After you start the backend server, run the frontend development server with this command in terminal:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/App.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about React.js, take a look at the following resources:

- [React.js Documentation](https://react.dev/reference/react) - learn about React.js features and API.
- [Learn React.js](https://react.dev/learn) - an interactive React.js tutorial.

## Deploy on Netlify
You can check the deployed site on [https://backend-guild-react.netlify.app/](https://backend-guild-react.netlify.app/)

There are many ways to deploy React.js app, but I chose [Netlify](https://www.netlify.com/) for this project.
It's very easy to deploy and set environment for the React projects.