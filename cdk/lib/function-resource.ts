import { aws_dynamodb as ddb } from "aws-cdk-lib";
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface FunctionResourceProps {
  readonly stage: string;
  readonly handler: string;
  readonly code: Code;
}

export class FunctionResource extends Construct {
  function: Function;
  constructor(scope: Construct, id: string, props: FunctionResourceProps) {
    super(scope, id);

    this.function = new Function(this, `${id}LambdaResource`, {
      runtime: Runtime.NODEJS_18_X,
      handler: props.handler,
      code: props.code,
      memorySize: 1024,
    });
  }
}
