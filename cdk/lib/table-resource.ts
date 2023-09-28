import { aws_dynamodb as ddb } from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export interface TableResourceProps {
  readonly stage: string;
  readonly tableEnvValue: string;
  readonly tableName: string;
  readonly partitionKeyName: string;
}

export class TableResource extends Construct {
  table: ddb.Table;
  tableEnvValue: string;

  constructor(scope: Construct, id: string, props: TableResourceProps) {
    super(scope, id);
    this.tableEnvValue = props.tableEnvValue;
    this.table = new ddb.Table(this, props.tableName, {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: props.partitionKeyName,
        type: ddb.AttributeType.STRING,
      },
    });
  }
}
