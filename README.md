# Client Repo for Wayfinder

This repository contains the up-to-date working demo of Wayfinder.

If you'd like more information about the project, visit the [wayfinder-project](https://github.com/Wayfinder-CS262-2020/wayfinder-project) repo.

To be able to see and use the app, you need to do a couple of things...
1. install [React Native and Expo](https://reactnative.dev/docs/0.61/getting-started)
2. Then clone this repository with `git clone https://github.com/Wayfinder-CS262-2020/wayfinder-client.git` (use `git pull` to get the latest version if you have already done this)
3. Open up the wayfinder-client folder with your favorite terminal and run `npm install`
4. Once that's done, you should be able to run `expo start` or `npm start` and it will start the metro bundler and expo server. A debug console will pop up in your browser and a QR code will pop up in the terminal.
5. To see the app, install the expo app on your phone and scan the QR code, and your're good to go!

If you get some odd expo errors especially if npm tells you expo isn't installed, you can try running these commands...
`npm install expo`
`npm audit fix --force`
`npm install`

Note: whenever npm or expo tell you to run a command like `yarn add expo`, you can substitue `npm install` for the `yarn add` and it should work if yarn isn't installed.

*May your ways be found*
