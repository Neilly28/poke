![pokehack](https://github.com/Neilly28/poke/assets/104105542/500cb8d5-619b-4928-a793-384147ffd6b0)

# Live Website

https://mypokehack.netlify.app/

# Pokéhack

Pokéhack is a full stack app that utilizes the PokeAPI and OpenAI API to allow users to generate their own custom Pokémon. Made with React, Node, Express, and MongoDB. Winner of Ironhack Berlin March 2023 Hackshow🥇

# Overview

- User-Centric Design: Pokéhack boasts an intuitive interface that ensures a seamless and enjoyable experience for users as they delve into the world of custom Pokémon creation. The overall design is somewhat inspired by this amazing [Awwwards nominee - Pokémon Corporate Website by FOURDIGIT Inc.](https://www.awwwards.com/sites/pokemon-corporate-website)

- Pokémon Generation: With the integration of the PokeAPI and OpenAI API, users have the ability to craft their own unique Pokémon. The app takes a Pokémon name, type, and description provided by the user and packages it as a prompt to the OpenAI API which then generates a custom Pokémon image based on the provided inputs. The user can then share their custom Pokémon creation in the Community page!

- Authentication and JWT: Secure user registration and login functionality using JWT authentication, ensuring a safe and personalized experience. You only need to register with an email and password to be able to start creating your own custom Pokémon.

 - React Components: The app's frontend is built using React components, offering a modular and maintainable code structure.

 - State Management with Context API: To manage state efficiently and simplify data flow between components, the app employs React's Context API for a smooth user experience.

- React Router: Seamlessly navigate between different sections of the app with React Router, featuring route guards to ensure access control.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Neilly28/poke.git
```

2. Navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

3. Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

## Usage

1. Start the backend server:

```bash
nodemon index.js
```

2. Start the frontend app:

```bash
npm start
```

## Technologies Used

- Frontend: React
- Backend: Node.js with Express.js
- Database: MongoDB

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
