import Dockerode from "dockerode";

export class DockerInitializer {
  private container!: Dockerode.Container;
  private dockerContext!: Dockerode.ImageBuildContext;
  private imageOptions!: Dockerode.ImageBuildOptions;
  private containerOptions!: Dockerode.ContainerCreateOptions;

  constructor(
    dockerContext: Dockerode.ImageBuildContext,
    imageOptions: Dockerode.ImageBuildOptions,
    containerOptions: Dockerode.ContainerCreateOptions
  ) {
    this.dockerContext = dockerContext;
    this.imageOptions = imageOptions;
    this.containerOptions = containerOptions;
  }

  public async createContainer(): Promise<void> {
    const docker = new Dockerode();
    await this.createImage(docker);
    this.container = await docker.createContainer(this.containerOptions);
  }

  public async startContainer(): Promise<void> {
    await this.container.start();
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 2000);
    });
  }

  public async stopContainer(): Promise<void> {
    await this.container.stop();
  }

  public async pruneContainer(): Promise<void> {
    await this.stopContainer();
    await this.container.remove();
  }

  private async createImage(docker: Dockerode): Promise<void> {
    const stream = await docker.buildImage(
      this.dockerContext,
      this.imageOptions
    );
    return new Promise((res, rej) => {
      docker.modem.followProgress(stream, (error) => {
        if (error) {
          rej(error);
        } else {
          res();
        }
      });
    });
  }
}
