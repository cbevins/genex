# GENEX Svelte Installation Installation Process

Below are the steps I use to create this *genex* Sveltekit project with a remote Github repository.

## 1 - Create a Blank Remote Github Repository

First, go to Github and create a new repository *without* a README, .gitignore, or license file.  I usually use the same name for both the Github.com remote repository and the Sveltekit project directory.  In this example, the project and repo names are **genealogy**.


## 2 - Create a Sveltekit Project

From the parent directory of the new project (**OneDrive/develop**),
enter the following command to run the installation script:

```bash
npm sv create genex

┌  Welcome to the Svelte CLI! (v0.6.23)
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with Typescript?
│  No
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, vitest, tailwindcss, sveltekit-adapter
│
◇  tailwindcss: Which plugins would you like to add?
│  typography
│
◇  sveltekit-adapter: Which SvelteKit adapter would you like to use?
│  netlify
│
◆  Successfully setup add-ons
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
◆  Successfully installed dependencies
│
◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd genex                                                             │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
└  You're all set!

```

Then change into the project directory and install the required packages:

```bash
cd genex
npm install
```

## 3 - Create a Local Git Repository and Connect it to the Remote Github Repo

```bash
Initialize the local Git repository:
echo "# genex" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/cbevins/genex.git
git push -u origin main
```

Open VScode, add the new project folder to the Workspace, and ensure the **SOURCE CONTROL REPOSITORY** for the folder is attached to **main**.

I then edit the existing README.md to add the new project's actual info.

Whenever I commit changes to the local repo, I also use VScode to 'push' or sync'
the changes with the remote repo.


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.


## 4 - Install TailwindCSS

See https://tailwindcss.com/docs/installation

Use the **svelte-add** command line utility to ensure that:
- **npm install -D tailwindcss** is run,
- **npx tailwindcss init** is run,
- **tailwind.config.[js|ts]** is setup with proper paths, and
- '@addtailwind` directives are added to the main **src/app.css** file.

```bash
npx @svelte-add/tailwindcss@latest
```

## 5 - Install Flowbite

See https://flowbite-svelte.com

```bash
npm install -D flowbite-svelte flowbite
npm install -D flowbite-svelte-icons
```

## 6 - Configure **tailwind.config.ts** (or .js) and **app.css**

Update the tailwind.config.[ts|js] file from your root project folder to let the Tailwind CSS compiler know where to look for the utility classes and also set up the Flowbite plugin.

In the provided code below, you can customize the primary color by modifying the appropriate color values. To change the primary color, simply uncomment the desired color object and modify the corresponding color values as needed.

```js
import { fontFamily } from "tailwindcss/defaultTheme";
import flowbitePlugin from 'flowbite/plugin'
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
					// flowbite-svelte
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [flowbitePlugin]
};

export default config;
```


Also ensure that **src/app.css** is configured:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base { ... }
```

## 7 - Set up **app.html** favicon, etc

First, copy the preferred **favicon.png** (such as **Collin.jpg**) into the **static** folder.

Then, replace the main **app.html** with:

```html
<!doctype html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8" />

		<!-- Responsiveness meta tag -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<!-- favicon  -->
		<link rel="icon" href="%sveltekit.assets%/Collin.jpg" />
		
		<!-- The following is replaced by each +page.svelte's <svelte:head>
			content, if any, such as:
			<svelte:head>
				<title>Bevins-Riley</title>
				<meta name="description" content="Bevins-Riley genealogy" />
			</svelte:head> -->
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```
