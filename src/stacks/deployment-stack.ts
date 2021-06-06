import { StackProps, Stack, Construct } from '@aws-cdk/core'
import { ISource, BucketDeployment } from '@aws-cdk/aws-s3-deployment'
import { CloudFrontStack } from './cloudfront-stack'

type Props = StackProps & {
  cloudFront: CloudFrontStack
  source: ISource
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    const { cloudFront, source } = props
    const { bucket, distribution } = cloudFront

    /**
     * Bucket Deployment
     */
    new BucketDeployment(this, `BucketDeployment${id}`, {
      destinationBucket: bucket,
      sources: [source],
      distribution,
    })
  }
}
