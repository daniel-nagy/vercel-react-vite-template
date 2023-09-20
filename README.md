# A React Template for Vercel

A Vercel template using React, Typescript, and Vite.

#### Key Features

- Continuous integration
- Server rendering
- Bundling serverless functions

To see how this template was created checkout my blog post [Deploying a React App to Vercel](https://danielnagy.me/posts/Post_9zympalet5ub).

#### Technologies

- [esbuild](https://esbuild.github.io) — An extremely fast JavaScript bundler.
- [GitHub Actions](https://docs.github.com/en/actions) — A workflow automation framework.
- [Node.js](https://nodejs.org) — A JavaScript runtime.
- [React](https://react.dev) — A component syntax for JavaScript.
- [TypeScript](https://www.typescriptlang.org) — A statically typed version of JavaScript.
- [Vercel](https://vercel.com) — A serverless cloud provider.
- [Vite](https://vitejs.dev) — A Web compiler.
- [Yarn](https://yarnpkg.com/) — A Node.js package manager.

### How to Use This Template

Start by forking this repo. If you use [`asdf`](https://asdf-vm.com) just add the `nodejs` and `yarn` plugin.

```shell
> asdf plugin add nodejs
> asdf plugin add yarn
> asdf install
```

If you do not use asdf you will need Node.js and yarn installed using your preferred method. You can find the specific versions of these dependencies in the **.tool-versions** file.

Once you have Node.js and yarn installed run `yarn` to install the dependencies

```shell
> yarn
```

Next use the [Vercel CLI](https://vercel.com/docs/cli) to create a new project or link an existing project.

```shell
> yarn vercel
```

The CLI will prompt you to log in and create or link an existing project. Once complete your app will be ready. You can then run the `start` command to start your app on port `3000`.

```shell
> yarn start
```

### Manual Deployments

You can deploy your app manually using the following commands.

```shell
> yarn build
> yarn vercel deploy --prebuilt
```

### Automatic Deployments

This repo contains GitHub Actions workflows for automatically deploying updates to your app. Changes to an open PR will be automatically deployed to a preview environment. Changes to the main branch will be automatically deployed to production. This is a solid foundation for you to build on top of.

In order to use this feature you will need to add 3 secrets to your repository to link your Vercel project: `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN`. The `orgId` and `projectId` can be found in **.vercel/project.json** after you link your app using the CLI. You will need to create an API access token in Vercel.
