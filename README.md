<h1 align="center">Welcome to insync 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/insync" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/insync.svg">
  </a>
  <a href="https://twitter.com/alt\_sapien" target="_blank">
    <img alt="Twitter: alt\_sapien" src="https://img.shields.io/twitter/follow/alt\_sapien.svg?style=social" />
  </a>
</p>

> insync is a social app that helps people meet and chat based on compatibility

### 🏠 [visit here](https://in-sync.netlify.app/)

## Installation
  >To install and run the app locally, you'll need to follow these steps:

  1. Clone the repo
```sh
git clone https://github.com/kn-oz/inSync.git
``` 
  2. Install NPM packages
```sh
npm install
```
3. Set up firebase
 * Create a new Firebase project at https://console.firebase.google.com/
 * Enable the "Authentication" and "Firestore" services
 * You'll later add the API key and other config values to the .env file

$. Set up stream chat
 * Create a new Stream Chat app at https://getstream.io/chat/
 * You'll later add the API key and other config values to the .env file
5. Create a .env file in the root directory and add the following:
```sh
VITE_APIKEY=firebase api key
VITE_AUTHDOMAIN=firebase auth domain
VITE_PROJECTID=firebase project id
VITE_STORAGEBUCKET=firebase storage bucket
VITE_MESSAGINGSENDERID=firebase messaging sender id
VITE_APPID=firebase app id
VITE_MEASUREMENTID=firebase measurement id
VITE_STREAMAPPKEY=stream app key
```
these are the keys you will need to add to the .env file. remove them from 
## Run

```sh
npm run dev
```

## Author

👤 **Abhishek Sharma**

* Twitter: [@alt\_sapien](https://twitter.com/alt\_sapien)
* Github: [@kn-oz](https://github.com/kn-oz)
* LinkedIn: [@kn-oz](https://linkedin.com/in/kn-oz)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_