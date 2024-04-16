# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Real-time Chat Application:

Project-Requirements

Backend Architecture:

Express.js Server:
• It Handles HTTP requests from clients.
• Implements user authentication, private messaging, message history, and online/offline status indicators.
• Provides Web Socket endpoints for real-time communication.

Web Socket Server:
• Manages Web Socket connections between clients for real-time messaging.
• Handles Web Socket events such as connection, message reception, and disconnection.

Mongo DB Database:
• Stores user profiles and message data.
• User profiles include username, password (hashed), and online/offline status.
• Message data includes sender, recipient, message content, and timestamp.

Frontend Architecture:

React.js UI:
• Provides the user interface for the chat application.
• Components include login forms, chat room, message input field, and message display area.

Web Socket Client:

• Establishes Web Socket connections with the server for real-time messaging.
• Sends and receives messages from the server using the native Web Socket object provided by the browser.
Authentication Flow:
• Users can register with a unique username and password.
• Upon successful registration or login, the server issues a JWT token.
• This token is stored locally (e.g., in browser local Storage) and sent with subsequent requests for authentication.

File Structure:

Front-End:
Real-time-frontend/
Client/
src/
components/
ChatRoom.js
Home.js
Profile.js
Login.js
Signup.js
App.js
index.js
styles.css

Back-End
Server.js
Package. Json

How to run the code.

• Install a node-module in client end. Then run it as per the front-end side instructions.
• Open two terminals one is for server.js and another are for client.
• Back-end: server.js, give command “npm start”.
• Front-End side: cd Real-time-chat-app----> cd client------> npm start.
