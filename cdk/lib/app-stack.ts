import {
  aws_cognito as cognito,
  aws_s3 as s3,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_route53_targets as targets,
  aws_s3_deployment as deploy,
  Stack,
  StackProps,
  CfnOutput,
  RemovalPolicy,
} from "aws-cdk-lib";
import { Construct } from "constructs";

const WEB_APP_DOMAIN = "reactapp.nanosoft.co.za";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      env: {
        account: "<AWS_ACCOUNT_ID>",
        region: "<AWS_REGION>",
      },
    });
    //Get The Hosted Zone
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: "nanosoft.co.za",
    });
    //Create S3 Bucket for our website
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: WEB_APP_DOMAIN,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    //Create Certificate
    const siteCertificate = new acm.Certificate(scope, "SiteCertificate", {
      domainName: WEB_APP_DOMAIN,
      subjectAlternativeNames: [],
      validation: acm.CertificateValidation.fromDns(zone),
    });

    //Create CloudFront Distribution
    const siteDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "SiteDistribution",
      {
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          siteCertificate,
          {
            aliases: [WEB_APP_DOMAIN],
            securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        ),
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
      }
    );
    //Create A Record Custom Domain to CloudFront CDN
    new route53.ARecord(this, "SiteRecord", {
      recordName: WEB_APP_DOMAIN,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(siteDistribution)
      ),
      zone,
    });
    //Deploy site to s3
    new deploy.BucketDeployment(this, "Deployment", {
      sources: [deploy.Source.asset("./../app/build")],
      destinationBucket: siteBucket,
      distribution: siteDistribution,
      distributionPaths: ["/*"],
    });
  }
}
