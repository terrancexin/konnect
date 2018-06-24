# Konnect [(LIVE)](https://konnect-chat.herokuapp.com/)
###### Konnect is a real-time chat app. If you're passionate about something, why do it alone? Let's Konnect!
![screenshot](./docs/demo.png)

# Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Socket.io](http://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://facebook.github.io/react/)
- [Redux](https://redux.js.org/)
- [Webpack](https://webpack.js.org/)

# Local set up
###### Set up process assumes that all of the above technologies are available on your machine
1. Run `git clone https://github.com/terrancexin/konnect.git && cd konnect && npm i`
2. Please make sure `mongod` database is running
3. Start the app by `npm run dev`
###### Ready! Go to: [http://localhost:3000](http://localhost:3000)

##### Set up troubleshoots
- Check node version: 8+ 
- MongoDB set up
  - run `brew install mongodb`
  - run `sudo mkdir -p /data/db`
  - run `sudo chown -R $USER /data/db`
  - start mongodb by running `mongod`
- MongoDB existing database error
  - run `ps ax | grep mongod`
  - terminate the current running database number. e.g. run `kill 90233`
  - start mongodb by running `mongod`

## High Level Overview
Build real-time chat functionality
- A single chatroom
- Persist user info and messages
- Responsive design UI/UX
- Scalable and flexible system

## Demo
![gif](./docs/konnect.gif)

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
- User can select an avatar at sign up
- User can pick emojis when sending a message
- User can send giphys
- User can search for giphys
- User can upload an image
- User can preview the image before sending
- Private chat room

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
  - [x] moment.js removed
  