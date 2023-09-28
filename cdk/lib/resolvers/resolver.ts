import { Code } from "aws-cdk-lib/aws-lambda";
import {
  GraphqlApi,
  AppsyncFunction,
  LambdaDataSource,
  MappingTemplate,
} from "aws-cdk-lib/aws-appsync";
import { Construct } from "constructs";
import { TableResource } from "../table-resource";
import { FunctionResource } from "../function-resource";
import { ResolverProps } from "../interfaces/resolver-props";

export interface CreateAppSyncLambdaFunctionProps {
  handler: string;
  code: Code;
  tableResources: Array<TableResource>;
  requestMappingTemplate: string;
  responseMappingTemplate: string;
}

export interface CreateResolverProps {
  typeName: string;
  fieldName: string;
  requestMappingTemplate: string;
  responseMappingTemplate: string;
}

export class Resolver extends Construct {
  stage: string;
  api: GraphqlApi;
  dataSource: LambdaDataSource;
  functions: Array<AppsyncFunction>;

  constructor(scope: Construct, id: string, props: ResolverProps) {
    super(scope, id);
    this.stage = props.stage;
    this.api = props.api;
    this.functions = [];
    // Set the new Lambda function as a data source for the AppSync API
  }

  createAppSyncLambdaFunction(
    name: string,
    props: CreateAppSyncLambdaFunctionProps
  ) {
    const functionResource = new FunctionResource(
      this,
      `${name}LambdaFunction`,
      {
        stage: this.stage,
        handler: props.handler,
        code: props.code,
      }
    );

    // enable the Lambda function to access the DynamoDB table (using IAM)
    props.tableResources.forEach((tableResource) => {
      tableResource.table.grantFullAccess(functionResource.function);
      functionResource.function.addEnvironment(
        tableResource.tableEnvValue,
        tableResource.table.tableName
      );
    });

    this.dataSource = new LambdaDataSource(this, `${name}DataSource`, {
      api: this.api,
      lambdaFunction: functionResource.function,
    });

    this.dataSource.createFunction(`${name}AppSyncFunctionCdk`, {
      name: `${name}AppSyncFunction`,
      requestMappingTemplate: MappingTemplate.fromFile(
        props.requestMappingTemplate
      ),
      responseMappingTemplate: MappingTemplate.fromFile(
        props.requestMappingTemplate
      ),
    });
  }

  createResolver(name: string, props: CreateResolverProps) {
    this.api.createResolver(`${name}Resolver`, {
      typeName: props.typeName,
      fieldName: props.fieldName,
      pipelineConfig: this.functions,
      requestMappingTemplate: MappingTemplate.fromFile(
        props.requestMappingTemplate
      ),
      responseMappingTemplate: MappingTemplate.fromFile(
        props.responseMappingTemplate
      ),
    });
  }
}
