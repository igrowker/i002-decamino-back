import { expect } from 'chai'
import supertest from 'supertest'
import '../src/config/env.js'
import { describe } from 'mocha'

const requester = supertest(process.env.BASE_URL + "/api")

describe("Testeando metodos de pago: ", () => {
    
})