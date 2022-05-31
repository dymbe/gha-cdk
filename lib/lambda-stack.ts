import { Stack, StackProps, Duration, aws_lambda as lambda, aws_cognito as cognito } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda1 = new PythonFunction(this, 'Lambda1', {
      entry: './lambda-hooks/lambda1/src',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: Duration.minutes(1)
    });
    const lambda2 = new PythonFunction(this, 'Lambda2', {
      entry: './lambda-hooks/lambda2/src',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: Duration.minutes(1)
    });

    const userpool = new cognito.UserPool(this, 'UserPool', {
      standardAttributes: {
        email: {
          required: true,
          mutable: false
        }
      },
      signInAliases: {
        email: true,
        username: false
      },
      lambdaTriggers: {
        postConfirmation: lambda1,
        preTokenGeneration: lambda2
      }
    });
  }
}
