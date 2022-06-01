import {
    Stack,
    StackProps,
    aws_servicediscovery as servicediscovery,
    aws_ec2 as ec2,
    aws_ecs as ecs,
    aws_ecr as ecr,
    aws_ecr_assets as ecrAssets
} from 'aws-cdk-lib';
import * as ecrDeploy from 'cdk-ecr-deployment';
import { Construct } from 'constructs';

export class OtherStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc');
    const cluster = new ecs.Cluster(this, 'Cluster')

    const namespace = new servicediscovery.PrivateDnsNamespace(this, 'Namespace', {
      name: 'namespaceName',
      vpc: vpc
    });

    const userServiceRepo = new ecr.Repository(this, 'EcrRepo');

    const dockerImageAsset = new ecrAssets.DockerImageAsset(this, 'ContainerImage', { directory: 'service' });

    new ecrDeploy.ECRDeployment(this, 'DeployDockerImage', {
      src: new ecrDeploy.DockerImageName(dockerImageAsset.imageUri),
      dest: new ecrDeploy.DockerImageName(`${userServiceRepo.repositoryUri}:latest`)
    });
  }
}
