import { SynthUtils } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as CdkAlbRedirect from '../src/stacks/deployment-stack'
import { ENVIRONMENT_STAGING } from '../src/config'
import { HostedZoneStack } from '../src/stacks/hostedZone-stack'
import { CertificateManagerStack } from '../src/stacks/certificate-manager-stack'
import { env } from './__mocks__/env'
import { CloudFrontStack } from '../src/stacks/cloudfront-stack'
import { Source } from '@aws-cdk/aws-s3-deployment'
import { resolve } from 'path'

it('snapshot: CdkDeploymentStack', () => {
  const app = new cdk.App()
  const environment = ENVIRONMENT_STAGING
  const domainName = 'dkrk-blog.net'
  const hostedZoneName = 'dkrk-blog.net'

  const { zone } = new HostedZoneStack(app, 'testDns', {
    hostedZoneName,
    env,
  })

  const { certificate } = new CertificateManagerStack(app, 'testCert', {
    hostedZoneName,
    zone,
    env,
  })

  const cloudFront = new CloudFrontStack(app, 'testCf', {
    environment,
    domainName,
    certificate,
    lambdaFunctionCode: 'console.log("hi")',
    zone,
    env,
  })

  const stack = new CdkAlbRedirect.DeploymentStack(app, 'MyTestStack', {
    cloudFront,
    source: Source.asset(`${resolve(__dirname)}/__mocks__/sources`),
    env,
  })

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})
