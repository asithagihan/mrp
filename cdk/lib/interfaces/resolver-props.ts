import { GraphqlApi } from "aws-cdk-lib/aws-appsync";

export interface ResolverProps {
  readonly stage: string;
  readonly dataSourceName: string;
  readonly api: GraphqlApi;
}
