import {
    Stack,
    StackProps,
    aws_servicediscovery as servicediscovery,
    aws_ec2 as ec2,
    aws_ecs as ecs
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class OtherStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc');
    const cluster = new ecs.Cluster(this, "Cluster")

    const namespace = new servicediscovery.PrivateDnsNamespace(this, 'Namespace', {
      name: "namespaceName",
      vpc: vpc
    });
  }
}
