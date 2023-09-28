import { Construct } from "constructs";
import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { AuthResource } from "./auth-resource";
import { FunctionResource } from "./function-resource";
import { Code } from "aws-cdk-lib/aws-lambda";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const STAGE: string = process.env.STAGE || "dev";

    const cognito = new AuthResource(this, "AppUserPoolResource", {
      stage: STAGE,
    });

    const api = new RestApi(this, "api", {
      description: "example api gateway",
      deployOptions: {
        stageName: "dev",
      },
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["http://localhost:3000"],
      },
    });

    new CfnOutput(this, "apiUrl", { value: api.url });

    const expressApp = new FunctionResource(this, `ApiLambdaFunction`, {
      stage: STAGE,
      handler: "lambda.handler",
      code: Code.fromAsset("./../api/dist/", {}),
    });

    const anyPath = api.root.addResource("{proxy+}");

    anyPath.addMethod(
      "ANY",
      new LambdaIntegration(expressApp.function, { proxy: true })
    );

    // Prints out the stack region to the terminal
    new CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
