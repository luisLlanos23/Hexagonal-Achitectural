import dockerode from 'dockerode'

const testImageTag = `${new Date().getTime()}-test-postgres`

export const postgresqlDBDockerContext: dockerode.ImageBuildContext = {
  context: __dirname,
  src: ['Dockerfile']
}

export const postgresqlDBImageOptions: dockerode.ImageBuildOptions = {
  t: testImageTag,
  networkmode: 'host',
  rm: true
}

export const postgresqlDBContainerOptions: dockerode.ContainerCreateOptions = {
  ExposedPorts: {
    '5432/tcp': {}
  },
  Tty: false,
  HostConfig: {
    PortBindings: {
      '5432/tcp': [
        {
          HostIp: '',
          HostPort: '5433'
        }
      ]
    }
  },
  Env: [
    'POSTGRESQL_USERNAME=test',
    'POSTGRESQL_PASSWORD=test',
    'POSTGRESQL_DATABASE=test',
    'ALLOW_EMPTY_PASSWORD=yes',
    'POSTGRESQL_ALLOW_REMOTE_CONNECTIONS=true'
  ],
  Image: `${testImageTag}:latest`,
  name: testImageTag
}