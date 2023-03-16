const request = require('supertest')
const { Genre } = require('../../models/genres')
const { User } = require('../../models/users')

let server

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index')
  })

  afterEach(async () => {
    server.close()
    await Genre.deleteMany({})
  })

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ])

      const res = await request(server).get('/api/genres')

      expect(res.status).toBe(200)
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy()
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1')
      expect(res.status).toBe(404)
    })

    it('should return genre details with the given id', async () => {
      const mockGenre = new Genre({ name: 'genre1' })
      await mockGenre.save()

      const res = await request(server).get(`/api/genres/${mockGenre._id}`)

      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({ name: 'genre1' })
    })
  })

  describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
      const res = await request(server)
        .post('/api/genres')
        .send({ name: 'genre1' })

      expect(res.status).toBe(401)
    })

    it('should return 400 if genre is less than 5 chars', async () => {
      const mockToken = new User().generateAuthToken()

      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', mockToken)
        .send({ name: '1234' })

      expect(res.status).toBe(400)
    })

    it('should return 400 if genre is more than 30 chars', async () => {
      const mockToken = new User().generateAuthToken()

      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', mockToken)
        .send({ name: new Array(32).join('a') })

      expect(res.status).toBe(400)
    })
  })
})
