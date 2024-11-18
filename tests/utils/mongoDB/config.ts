import dockerode from 'dockerode'

const testImageTag = `${new Date().getTime()}-test-mongodb`

export const mongoDBDockerContext: dockerode.ImageBuildContext = {
  context: __dirname,
  src: ['Dockerfile'],
}

export const mongoDBImageOptions: dockerode.ImageBuildOptions = {
  t: testImageTag,
  networkmode: 'host',
  rm: true,
}

export const mongoDBContainerOptions: dockerode.ContainerCreateOptions = {
  ExposedPorts: {
    '27017/tcp': {},
  },
  Tty: false,
  HostConfig: {
    PortBindings: {
      '27017/tcp': [
        {
          HostIp: '',
          HostPort: '27018',
        },
      ],
    },
  },
  Env: [
    'MONGODB_USERNAME=test',
    'MONGODB_PASSWORD=test',
    'MONGODB_DATABASE=test',
    'ALLOW_EMPTY_PASSWORD=yes',
  ],
  Image: `${testImageTag}:latest`,
  name: testImageTag,
}
