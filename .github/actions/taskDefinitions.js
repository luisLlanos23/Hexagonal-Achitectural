const { writeFileSync } = require('fs')
const { resolve } = require('path')
const axios = require('axios')

const { TASK_DEFINITION_SERVICE_URL, TASK_DEFINITION_SERVICE_TOKEN, ENV } = process.env

let task = null
let fileName = null

switch (ENV) {
    case 'production': {
        task = 'hexagonal-prod'
        fileName = 'task-definition.prod.json'
        break
    }
    case 'dev': {
        task = 'hexagonal-dev'
        fileName = 'task-definition.demo.json'
        break
    }
}

axios({
    url: `${TASK_DEFINITION_SERVICE_URL}/task-definition/${task}/last`,
    method: 'get',
    headers: {
        authorization: TASK_DEFINITION_SERVICE_TOKEN
    }
})
    .then(({ data: { body: { taskDefinition } } }) => {
        console.log(`${resolve(__dirname)}/${fileName}`)
        writeFileSync(
            `${resolve(__dirname)}/../../${fileName}`,
            JSON.stringify(taskDefinition)
        )
    })
    .catch(error => {
        console.log(error, error.stack)
        process.exit(1)
    })