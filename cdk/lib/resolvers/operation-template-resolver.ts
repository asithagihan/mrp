import { Construct } from "constructs";
import { ResolverProps } from "../interfaces/resolver-props";
import { Resolver } from "./resolver";
import { Code } from "aws-cdk-lib/aws-lambda";
import { TableResource } from "../table-resource";

export interface OperationTemplateResolverProps extends ResolverProps {
  readonly tableResources: Array<TableResource>;
}

export class OperationTemplateResolver extends Resolver {
  tableResources: Array<TableResource>;
  constructor(
    scope: Construct,
    id: string,
    props: OperationTemplateResolverProps
  ) {
    super(scope, id, props);
    this.tableResources = props.tableResources;
  }

  create() {
    this.createAppSyncLambdaFunction("OperationTemplate", {
      handler: "operation-template.handler",
      code: Code.fromAsset("./../api/src", {}),
      tableResources: this.tableResources,
      requestMappingTemplate: "",
      responseMappingTemplate: "",
    });
    this.createResolver("GetOperationTemplate", {
      typeName: "Query",
      fieldName: "getOperationTemplate",
      requestMappingTemplate: "",
      responseMappingTemplate: "",
    });
    this.createResolver("CreateOperationTemplate", {
      typeName: "Query",
      fieldName: "createOperationTemplate",
      requestMappingTemplate: "",
      responseMappingTemplate: "",
    });
    this.createResolver("ListOperationTemplates", {
      typeName: "Query",
      fieldName: "listOperationTemplates",
      requestMappingTemplate: "",
      responseMappingTemplate: "",
    });
    this.createResolver("DeleteOperationTemplate", {
      typeName: "Query",
      fieldName: "deleteOperationTemplate",
      requestMappingTemplate: "",
      responseMappingTemplate: "",
    });
  }
}
