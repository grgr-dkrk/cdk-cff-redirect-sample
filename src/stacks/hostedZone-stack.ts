import { StackProps, Stack, Construct } from '@aws-cdk/core'
import { HostedZone, IHostedZone } from '@aws-cdk/aws-route53'

type Props = StackProps & {
  hostedZoneName: string
}

export class HostedZoneStack extends Stack {
  public readonly zone: IHostedZone
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    /**
     * environment, domain,
     */
    const { hostedZoneName } = props

    /**
     * HostedZone
     */
    this.zone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: hostedZoneName,
    })
  }
}
