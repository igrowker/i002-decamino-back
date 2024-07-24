import { expect } from 'chai'
import supertest from 'supertest'
import '../src/config/env.js'

const requester = supertest(process.env.BASE_URL + "/api")

describe("Testeando un flujo de operaciones para Users...", () => {

  // Declaro variables cuyo valor voy a completar de acuerdo a las respuestas de MongoDB
  let token
  let userId

  const email = "testing@gmail.com"
  const password = "12345678"

  it("Debería registrar un usuario", async () => {
    const data = { username: "Test de User", email, password, role: "traveler" }
    const response = await requester.post('/user/register').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(201)
    expect(body).to.have.property('_id');

    // El userId que me asigna MongoDB
    userId = body._id
  })

  it("Debería arrojar error al intentar crear usuario con mismo mail", async () => {
    const data = { username: "Test de User", email, password, role: "traveler" }
    const response = await requester.post('/user/register').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(400)
    expect(body.message).to.be.equals('Correo electrónico ya registrado');
  })

  it("Debería iniciar sesión", async () => {
    const data = { email, password }
    const response = await requester.post('/user/login').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body).to.have.property('token');

    // El token con el jwt del usuario
    token = "Bearer " + body.token
  })

  it("Debería obtener el perfil del usuario", async () => {
    const response = await requester.get('/user/profile').set('Authorization', token)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body.response).to.include.all.keys('id', 'email', 'username', 'role', 'profileImg');
  })

  it("Debería modificar el número de teléfono del usuario", async () => {
    const response = await requester.put('/user/profile').set('Authorization', token).send({ phoneNumber: "1122334455" })
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body.response).to.include.all.keys('id', 'email', 'username', 'role', 'profileImg', 'phoneNumber')
    expect(body.response.phoneNumber).to.be.equals("1122334455")
  })

  it("Debería eliminar al usuario", async () => {
    const response = await requester.delete('/user/destroy').set('Authorization', token)
    const { body, statusCode } = response
    expect(statusCode).to.be.equals(200)
    expect(body.response).to.be.equals(`Usuario ${userId} eliminado`)
  })

})