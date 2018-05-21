const MessageModel = require('./models/message');
const UserModel = require('./models/user');

const users = [
  {
    username: 'jon snow',
    password: 'password',
    bookMark: '',
    onlineStatus: false,
  },
  {
    username: 'daenerys',
    password: 'password',
    bookMark: '',
    onlineStatus: true,
  },
  {
    username: 'cersei',
    password: 'password',
    bookMark: '',
    onlineStatus: true,
  },
  {
    username: 'tyrion',
    password: 'password',
    bookMark: '',
    onlineStatus: true,
  },
  {
    username: 'night king',
    password: 'password',
    bookMark: '',
    onlineStatus: true,
  },
  {
    username: 'hodor',
    password: 'password',
    bookMark: '',
    onlineStatus: true,
  },
  {
    username: 'ygritte',
    password: 'password',
    bookMark: '',
    onlineStatus: false,
  },
];

const messages = [
  {
    username: 'daenerys',
    text: 'hey guys, ready for our roadtrip to Kings Landing today?',
    date: new Date('5/25/2018 10:00:12'),
  },
  {
    username: 'tyrion',
    text: 'oh yesssss',
    date: new Date('5/25/2018 10:30:12'),
  },
  {
    username: 'cersei',
    text: 'lol. where is jon? looks like he\'s offline?',
    date: new Date('5/25/2018 11:15:12'),
  },
  {
    username: 'daenerys',
    text: 'I think he\'s still sleeping.. ughh. jon knows nothing!',
    date: new Date('5/25/2018 14:54:12'),
  },
  {
    username: 'hodor',
    text: 'hodor hodorr!!',
    date: new Date('5/25/2018 20:42:12'),
  },
  {
    username: 'night king',
    text: '...',
    date: new Date('5/25/2018 22:17:12'),
  },
];

const seedUsers = () => {
  users.forEach(({ username, password, bookMark, onlineStatus }) => {
    UserModel.create({
      username,
      password,
      bookMark,
      onlineStatus,
    });
  });
};

const seedMessages = () => {
  messages.forEach((message) => {
    const newMessage = new MessageModel({
      username: message.username,
      text: message.text,
      date: message.date,
    });

    newMessage.save((err) => {
      if (err) {
        console.log(`seednig message error: ${err}`);
      }
    });
  });
};

module.exports = {
  seedMessages,
  seedUsers,
};
