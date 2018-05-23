# Konnect
###### Konnect is a real-time chat app. If you're passionate about something, why do it alone? Let's Konnect!
![screenshot](./public/images/demo.png)

# Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Socket.io](http://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://facebook.github.io/react/)
- [Redux](https://redux.js.org/)
- [Webpack](https://webpack.js.org/)

# Set up
###### Set up process assumes that all of the above technologies are available on your machine
1. run `git clone https://github.com/terrancexin/konnect.git && cd konnect`
2. run `npm install`
3. open 3 terminal windows:
  - please make sure `mongod` database is running
    - `brew install mongodb`
    - `sudo mkdir -p /data/db`
    - `sudo chown -R $USER /data/db`
    - start mongodb by running`mongod`
  - please make sure `webpack -w` is running
  - start the app by `npm run dev`
4. open a new browser and go to `http://localhost:3000/`

##### Set up extras
- insert fake seeds by uncommenting line:31 in `server/index.js` and restart the server
- clear the database by uncommenting line:14 in `server/index.js`
- enable LAN mode on line:23 in `client/actions/index.js` and comment out line:25
  - run `ipconfig getifaddr en0` in the terminal
  - open a new browser with the ip address and port 3000 on any connected devices in the same network
  - e.g. `http://192.168.1.123:3000`
  - now you're able to chat across devices in real time

## High Level Overview
Build real-time chat functionality
- A single chatroom
- Persist user info and messages
- Responsive design UI/UX
- Scalable and flexible system

## Demo
![gif](./public/images/konnect.gif)

## Features
- Join & leave a chatroom
- Link detection in message
- Loading spinner
- Mobile accessibility
- Online active/inactive status indicator
- Read unread messages since the last logout
- Real-time display of how many users are typing
- Secure authentication and session by using BCrypt to salt passwords
- Send & receive messages in real-time across different users
- User join & leave notification in real time

## User Stories
- As a user, I want to authenticate my username and password.
- As a user, I want to join and leave the chatroom.
- As a user, I want to send and receive messages.
- As a user, I want to see my unread messages since last logout.
- As a user, I want to see all the messages in the chat room in real-time.
- As a user, I want to see whoever is typing in real time.
- As a user, I want to see whoever joins/leaves in real time.
- As a user, I want to see the number of users registered on Konnect.
- As a user, I want to see the number of users currently online.

## Tech Debts
- Implement redis cache for inefficient queries and reduce db queries
- Add automation tests
- Add more responsiveness on the UI
- Set up load balancer for scaling
- Remove libraries and write my own functions to enhance security