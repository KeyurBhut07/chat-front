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
    avatar: ["https://randomuser.me/api/portraits/women/32.jpg"],
    _id: "1",
    name: "John",
    groupChat: false,
    member: ["1", "2"],
  },
  {
    avatar: ["https://randomuser.me/api/portraits/women/32.jpg"],
    _id: "2",
    name: "Keyur",
    groupChat: false,
    member: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "John",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    _id: "2",
    name: "KB",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    _id: "3",
    name: "AK",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

export const sampleNotifications = [
  {
    sender: {
      name: "AK",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    _id: "1",
  },
  {
    sender: {
      name: "KB",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    _id: "2",
  },
];

export const samapleMessage = [
  {
    attchments: [{ public_id: "asdas", url: "link" }],
    content: "Loda ka message hai",
    _id: "dsfsdfsdfsdfd",
    sender: {
      _id: "user._id",
      name: "chaman",
    },
    chat: "chatId",
    createdAt: "Date",
  },
];
