const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'TestBlogger',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 5
  },
  {
    title: 'TestBlogger',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 6
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('the right amount of blogs is returned as json, and id is id', () => {

  test('the right amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Id is named id and not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'NewTitle',
      author: 'NewAuthor',
      url: 'NewURL',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'NewTitle'
    )
  })

  test('blog likes default to 0 if not given', async () => {

    const newBlog = {
      title: '0 like blog',
      author: 'Hated author',
      url: 'No one will click this url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})

    expect(blogs[initialBlogs.length].likes).toBe(0)
  })

  /*test('if title / url missing, give status code 400', async () => {

    const newBlog = {
      author: 'TestSubject',
    }
    await api
      .post('api/blogs')
      .send(newBlog)
      .expect(400)

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(initialBlogs.length)
  })*/

})

/*describe('deleting and updating blogs', () => {
  test('a note can be deleted', async () => {

    const blogsInDb = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }

    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )
  
    const contents = blogsAtEnd.map(r => r.content)
  
    expect(contents).not.toContain(blogToDelete.content)
  })
})*/

afterAll(() => {
  mongoose.connection.close()
})