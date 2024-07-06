// avtar = [],
//   name,
//   _id,
//   gropChat = false,
//   sameSender,
//   isOnline,
//   newMessage,
//   index = 0,
//   handleDelteChatOpen,

export const sampleChats = [
  {
    avatar: ['https://randomuser.me/api/portraits/women/32.jpg'],
    _id: '1',
    name: 'John',
    groupChat: false,
    member: ['1', '2'],
  },
  {
    avatar: ['https://randomuser.me/api/portraits/women/32.jpg'],
    _id: '2',
    name: 'Keyur',
    groupChat: false,
    member: ['1', '2'],
  },
];

export const sampleUsers = [
  {
    _id: '1',
    name: 'John',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    _id: '2',
    name: 'KB',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    _id: '3',
    name: 'AK',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
];

export const sampleNotifications = [
  {
    sender: {
      name: 'AK',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    _id: '1',
  },
  {
    sender: {
      name: 'KB',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    _id: '2',
  },
];

export const samapleMessage = [
  {
    attchments: [
      {
        public_id: 'asdas',
        url: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
    ],
    content: '',
    _id: 'dsfsdfsdfsdfd',
    sender: {
      _id: 'user',
      name: 'chaman',
    },
    chat: 'chatId',
    createdAt: 'Date',
  },
  {
    attchments: [],
    content: 'ka message hai 2',
    _id: 'dsfsdfsdfsdfdddsds',
    sender: {
      _id: 'jkdlsjdks',
      name: 'chaman 2',
    },
    chat: 'chatId',
    createdAt: 'Date',
  },
];

export const dasboardData = {
  users: [
    {
      _id: '1',
      name: 'AK',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      username: 'heelo',
      friends: '2',
      groups: '4',
    },
    {
      _id: '2',
      name: 'KB',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      username: 'heelo',
      friends: '2',
      groups: '4',
    },
    {
      _id: '3',
      name: 'chaman',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      username: 'heelo',
      friends: '2',
      groups: '4',
    },
    {
      _id: '4',
      name: 'chaman 2',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      username: 'heelo',
      friends: '2',
      groups: '4',
    },
  ],

  chats: [
    {
      _id: '1',
      name: 'AK',
      avatar: ['https://randomuser.me/api/portraits/women/32.jpg'],
      groupChat: false,
      members: [
        {
          _id: '1',
          avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        },
        {
          _id: '2',
          avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        },
      ],
      totalMembers: 2,
      totalMessages: 120,
      creator: {
        name: 'KB',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
    },
  ],
  messages: [
    {
      attachments: [
        {
          public_id: '12',
          url: 'https://randomuser.me/api/portraits/women/32.jpg',
        },
      ],
      _id: '1',
      content: 'loda aks ms',
      sender: {
        _id: '1',
        name: 'KB',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      chat: 'chatId',
      groupChat: false,
      createdAt: new Date().getTime(),
    },
    {
      attachments: [],
      _id: '2',
      content: '',
      sender: {
        _id: '1',
        name: 'KB',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      chat: 'chatId',
      groupChat: false,
      createdAt: new Date().getTime(),
    },
  ],
};
