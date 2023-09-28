import { aws_appsync as appsync } from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export interface GraphqlApiProps {
  readonly stage: string;
  readonly name: string;
  readonly userPool: UserPool;
  readonly schemaPath: string;
}

export class GraphqlApi extends Construct {
  api: appsync.GraphqlApi;
  constructor(scope: Construct, id: string, props: GraphqlApiProps) {
    super(scope, id);

    // Creates the AppSync API
    this.api = new appsync.GraphqlApi(this, `${props.name}GraphqlApiResource`, {
      name: props.name,
      schema: appsync.SchemaFile.fromAsset(props.schemaPath),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
            defaultAction: appsync.UserPoolDefaultAction.ALLOW,
          },
        },
      },
      xrayEnabled: true,
    });
  }
}
