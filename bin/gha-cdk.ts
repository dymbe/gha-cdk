#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lambdastack/lambda-stack';
import { OtherStack } from '../otherstack/other-stack';

const app = new cdk.App();
new LambdaStack(app, 'LambdaStack');
new OtherStack(app, 'OtherStack');
