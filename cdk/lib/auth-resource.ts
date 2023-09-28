import { Duration, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import {
  UserPool,
  VerificationEmailStyle,
  StringAttribute,
  AccountRecovery,
  OAuthScope,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export interface AppAuthResourceProps {
  readonly stage: string;
}

export class AuthResource extends Construct {
  userPool: UserPool;
  userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props: AppAuthResourceProps) {
    super(scope, id);

    this.userPool = new UserPool(this, `${id}CognitoPool`, {
      userPoolName: `${props.stage}${id}CognitoPool`,
      selfSignUpEnabled: true,
      signInCaseSensitive: false,
      signInAliases: {
        email: true,
        phone: true,
      },
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: "Hello from My Cool App!",
        emailBody:
          "Hello, Thanks for registering in My cool app! Verification code is {####}.",
        emailStyle: VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        fullname: {
          required: true,
          mutable: true,
        },
        email: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        company: new StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.userPoolClient = this.userPool.addClient(`${id}ClientResource`, {
      userPoolClientName: `${id}Client`,
      oAuth: {
        flows: { authorizationCodeGrant: true },
        scopes: [OAuthScope.OPENID],
        callbackUrls: ["https://myapp.com/home"],
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      refreshTokenValidity: Duration.minutes(60),
      idTokenValidity: Duration.minutes(30),
      accessTokenValidity: Duration.minutes(30),
    });

    new CfnOutput(this, `${id}UserPoolId`, {
      value: this.userPool.userPoolId,
    });

    new CfnOutput(this, `${id}UserPoolClientId`, {
      value: this.userPoolClient.userPoolClientId,
    });
  }
}
