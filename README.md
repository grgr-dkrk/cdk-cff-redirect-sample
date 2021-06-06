# AWS CDK CloudFront Function redirect sample

This is a sample for redirecting with s3 + cloudfront (with OAI) + cloudfront function on the AWS CDK.

## config

Create `.env` file in the root then set params:

```
AWS_ACCOUNT=
AWS_REGION=
DOMAIN_STAGING=
HOSTED_ZONE_STAGING=
```

## run

Add the Hosted Zone manually, then:

```
yarn

# Create HostedZone, Certificate and Cloudfront
yarn create:stg

# Deploy
yarn deploy:stg

# Destroy
yarn destroy:stg
```
