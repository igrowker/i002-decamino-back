import { expect } from 'chai'
import supertest from 'supertest'
import '../src/config/env.js'

const requester = supertest(process.env.BASE_URL + "/api")

describe("Testeando un flujo de operaciones para Users...", () => {

  const email = "testing@gmail.com"
  const password = "12345678"

  it("Debería registrar un usuario", async () => {
    const data = { username: "Test de User", email, password, role: "merchant" }
    const response = await requester.post('/user/register').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(201)
    expect(body).to.have.property('_id');
})

})