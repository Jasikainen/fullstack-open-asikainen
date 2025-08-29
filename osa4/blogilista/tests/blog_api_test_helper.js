const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const initialUsers = [
  {
    username: 'username1',
    name: 'name1',
    password: 'password1',
  },
  {
    username: 'username2',
    name: 'name2',
    password: 'password2',
  },
  {
    username: 'username3',
    name: 'name3',
    password: 'password3',
  },
]

const oneBlog = {
  title: 'Testing blog',
  author: 'Unauthorized blogger',
  url: 'https://bloggers-are-best.com/',
  likes: 666,
}

// Returns a blogs id that is first saved and after that removed
const nonExistingId = async () => {
  const blog = new Blog({
    _id: '5a422bc61b54a676212d17fc',
    title: 'Test blog for the win',
    author: 'J. Asikainen',
    url: 'http://blog.space.com/code_for_everyone',
    likes: 123,
    __v: 0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

// returns databases blogs in current time state
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

// returns databases users in current time state
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

// Returns list of blogs with all other properties but
// id (blogs) and user (id) filtered off.
const blogsWithoutId = (blogs) => {
  const clonedBlogs = blogs.map((blog) => {
    const clone = (({ id, user, ...object }) => object)(blog)
    return clone
  })
  return clonedBlogs
}

// returns list of blogs with given userId as their "user"
const blogsWithMasterUser = (userId) => {
  const blogsWithUser = initialBlogs.map((blog) => ({ ...blog, user: userId }))
  return blogsWithUser
}

module.exports = {
  initialBlogs,
  oneBlog,
  nonExistingId,
  blogsInDb,
  blogsWithoutId,
  usersInDb,
  initialUsers,
  blogsWithMasterUser,
}
