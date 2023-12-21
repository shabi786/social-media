const users = [
  {
    id: 1,
    username: "John",
    avatar:
      "https://images.pexels.com/photos/19402437/pexels-photo-19402437/free-photo-of-a-kid-standing-by-the-wall-and-playing-on-a-traditional-musical-instrument.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Bio for user1",
  },
  {
    id: 2,
    username: "Tony",
    avatar:
      "https://images.pexels.com/photos/19567571/pexels-photo-19567571/free-photo-of-a-bride-and-groom-standing-in-the-grass-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Bio for user2",
  },
  {
    id: 3,
    username: "Steve",
    avatar:
      "https://images.pexels.com/photos/17120644/pexels-photo-17120644/free-photo-of-a-black-and-white-dog-sitting-in-the-grass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ",
    bio: "Bio for user3",
  },
  {
    id: 4,
    username: "Chris",
    avatar:
      "https://images.pexels.com/photos/19211978/pexels-photo-19211978/free-photo-of-woman-posing-on-brown-sofa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Bio for user4",
  },
  {
    id: 5,
    username: "Mark",
    avatar:
      "https://images.pexels.com/photos/19351511/pexels-photo-19351511/free-photo-of-portrait-of-parents-with-their-daughter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Bio for user5",
  },
  {
    id: 6,
    username: "Stephen",
    avatar:
      "https://images.pexels.com/photos/19510932/pexels-photo-19510932/free-photo-of-a-woman-in-a-red-scarf-is-standing-in-the-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Bio for user6",
  },
];

const posts = [
  {
    id: 1,
    userId: 1,
    image:
      "https://images.pexels.com/photos/17516645/pexels-photo-17516645/free-photo-of-smiling-couple-hugging-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Post 1 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 2,
    userId: 2,
    image:
      "https://images.pexels.com/photos/18467504/pexels-photo-18467504/free-photo-of-beautiful-woman-in-dress-posing-with-hands-in-gloves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    caption: "Post 2 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 3,
    userId: 3,
    image:
      "https://images.pexels.com/photos/19319719/pexels-photo-19319719/free-photo-of-back-view-of-woman-in-dress-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Post 3 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 4,
    userId: 4,
    image:
      "https://images.pexels.com/photos/15622396/pexels-photo-15622396/free-photo-of-men-sitting-on-stairs-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Post 4 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 5,
    userId: 5,
    image:
      "https://images.pexels.com/photos/19317145/pexels-photo-19317145/free-photo-of-portrait-of-woman-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Post 5 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 6,
    userId: 6,
    image:
      "https://images.pexels.com/photos/14468172/pexels-photo-14468172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Post 6 caption.",
    likes: 10,
    liked: false,
    comments: ["Comment 1", "Comment 2"],
  },
  // Add more posts
];

export const getUsers = () => Promise.resolve(users);
export const getPosts = () =>
  Promise.resolve(
    posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return user
        ? { ...post, user }
        : {
            ...post,
            user: { id: post.userId, username: "Unknown", avatar: "", bio: "" },
          };
    })
  );

export const getPostById = (postId) =>
  Promise.resolve({
    ...posts.find((post) => post.id === postId),
    user: users.find(
      (user) => user.id === posts.find((post) => post.id === postId).userId
    ),
  });

export const getUserById = (userId) =>
  Promise.resolve(users.find((user) => user.id === parseInt(userId)));
