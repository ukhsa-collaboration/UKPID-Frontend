# UK Poisons Information Database - Desktop App

[![tests status](https://gitlab.com/juicy-media-ltd/ukpid/ukpid-desktop-app/badges/main/pipeline.svg)](https://gitlab.com/juicy-media-ltd/ukpid/ukpid-desktop-app/commits/main)

## Introduction

This is the desktop application for the UK Poisons Information Database (UKPID), a service provided by
the [National Poisons Information Service (NPIS)](https://www.npis.org/).

The main role of NPIS is to advise NHS healthcare professionals on the diagnosis, treatment and care of poisoned
patients across the UK. The major workload of the NPIS is to advise hospital emergency departments, however minor
injuries units and primary care services are also significant users of the service – the latter involving NHS advice
services (NHS 111, NHS 24 and NHS Direct) to a large extent. Telephone calls are answered by Specialists in Poisons
Information (SPIs). Data from telephone enquiries to the NPIS and the advice given are stored in UKPID.

This is an Electron-based application. It uses [Electron Forge](https://www.electronforge.io/) to scaffold, build and
publish the app. Vue.js provides a framework for the UI. Vite is used to bundle it all.

This frontend application connects to
the [Laravel-based backend application](https://gitlab.com/juicy-media-ltd/ukpid/ukpid-backend).

## Development

You should run this project natively on your computer. Not inside WSL or Docker. While we will be developing this
application to be cross-platform to work on Windows and macOS, NPIS use Windows-based machines. WSL and Docker will both
run a Linux version of this application which isn't desirable when it comes to dealing with platform-specific
intricacies.

### Prerequisites

You must have the following setup and ready to go before working on this project:

- Node.js
  - On Windows, use [NVM for Windows](https://github.com/coreybutler/nvm-windows)
  - On Mac, use [nvm](https://github.com/nvm-sh/nvm)
  - Check the `.nvmrc` file for the version of Node in use on this project. On Windows you'll need to
    run `nvm use <version>` to switch to it, on Mac you can just run `nvm use`.
- [PhpStorm](https://www.jetbrains.com/phpstorm/) **2023.2 or later**
  - The `.idea` directory is intentionally committed to this repository, as it stores IDE configurations that will
    assist with the development of this application.

### Setup

1. Run `npm i` to install node modules
   - 🤩 Add yourself to the contributors listed in the package.json file!
2. Run `npm run start` to start the application for development

## Contributing

### Code quality

This project uses several tools to enforce code standards and style.

<!-- /* @formatter:off */ -->

![Screenshot from news satire programme The Day Today, showing Peter O'Hanraha-hanrahan with a quote that reads "I don't like it, but I'll have to go along with it](https://i.imgur.com/aYa6uPG.jpeg){width="200"}

<!-- /* @formatter:on */ -->

There's always debates to had over which code style is better, but they're not really important. These tools enforce one
style and strive solve the issue of conflicts between developers. You might not like it, but just go along with it!

#### Prettier

[Prettier](https://prettier.io) is installed and configured to enforce an opinionated code standard
for JS, CSS, JSON and Markdown files in this project. You should ensure Prettier is run before you make a commit.

PhpStorm is configured to run Prettier on save and on reformat. You should configure PhpStorm to use the node.js
interpreter provided by nvm for this project (Settings/Preferences > Languages > node.js).

You can also use `npx prettier . --write` to run Prettier manually.

#### ESLint and Stylelint

ESLint and Stylelint are also installed and configured on this project to enforce an opinionated code standard for JS
and CSS files.

PhpStorm should highlight errors in code.

You can use `npm run lint:js` to run ESLint, `npm run lint:style` to run
Stylelint, or `npm run lint` to run both along with a Prettier check.

### Writing content

There'll be times when you need to write user-facing messages such as status and error messages. Follow the spirit of
the [NHS's content style](https://service-manual.nhs.uk/content/how-we-write) when doing this. Keep it clear and
concise. Use punctuation and a spell checker.

### Review process

No code should be committed to the main branch without being submitted and reviewed as a merge request.

Merge requests must be reviewed and approved by a lead developer. CI/CD Pipelines are configured to run Laravel tests
and code quality tests on the code being submitted for merge. These pipelines must succeed before the merge request can
be approved. To save time and reduce the usage of pipeline minutes, it is recommended you run these tools locally before
marking your MR as ready for review.

## Documentation

### Application Documentation

While your code should be clean, obvious, and documented through docblocks and comments as appropriate, it may be
necessary to write documentation to detail processes, features, and anything else you deem relevant as you contribute to
this application. If you do this, you should write it in a Markdown file in the `/docs` directory.
