import Express from 'express'
import http from 'http'

const app = Express()

export const ExternalTestCompanyData = {
    accountnumber: '0045',
    address: 'external test address',
    accountname: 'Test Company Inc',
    phoneNumber: '00000'
}

export function initServer() {
    app.get('/externalCustomer/:externalReference', (req, res) => {
        if (req.headers.authorization === 'testauth' && req.query.access === '123') {
            res.send(ExternalTestCompanyData).end()
        } else {
            res.status(500).send(new Error('Bad auth'))
        }
    })

    http.createServer(app).listen(4545)
}