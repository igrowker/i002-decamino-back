import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(process.env.BASE_URL + '/api/user')

describe("Testeando un flujo de operaciones para Users...", () => {
  const email = "renzo@gmail.com"
  let cookie
})