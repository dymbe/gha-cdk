import { Stack, StackProps, Duration, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new PythonFunction(this, 'Lambda1', {
      entry: './lambda-hooks/lambda1/src',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: Duration.minutes(1)
    });
    new PythonFunction(this, 'Lambda2', {
      entry: './lambda-hooks/lambda2/src',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: Duration.minutes(1)
    });
  }
}
