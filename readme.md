# NEXT.JS base repository

This is a **_NEXT.JS_** base repository made with **TypeScript**, **Prettier**, **Eslint** and **Husky**.

<br>

# Setup

Use this repository as a **template**:

```
npx create-next-app [name] --example "https://github.com/BluecrowDEV/nextjs-base/tree/main"
```

Install **node_modules** by executing:

```
npm install
```

Then, initialize **Husky**:

```
npm run prepare
```

<br>

# Dependencies

> ### **Prettier**
>
> It formats the code over-writing bad code formatting.

> ### **ESlint**
>
> It analyzes the code, finds problems, and automatically fixes them.

> ### **Husky**
>
> It improves and verifies commits.

<br>

# Commands

> ### **npm run prepare**
>
> Initializes **Husky**.

> ### **npm run format**
>
> **Formats** the code and **over-write** bad code formatting of all the files.

> ### **npm run check-types**
>
> **Prints** any **warnings** or **errors** that the code produces.

> ### **npm run check-format**
>
> **Verify** all files for **formatting issues**.

> ### **npm run check-lint**
>
> **Verify** for lint **errors** in any **ts**, **tsx** or **js** file.

> ### **npm run check-all**
>
> Runs **npm run check-types**, **npm run check-format** and **npm run check-lint**.
