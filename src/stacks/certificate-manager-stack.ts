import { StackProps, Stack, Construct } from '@aws-cdk/core'
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager'
import { IHostedZone } from '@aws-cdk/aws-route53'

type Props = StackProps & {
  hostedZoneName: string
  zone: IHostedZone
}

export class CertificateManagerStack extends Stack {
  public readonly certificate: DnsValidatedCertificate
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    /**
     * environment, domain
     */
    const { zone, hostedZoneName } = props

    /**
     * Certificate
     */
    this.certificate = new DnsValidatedCertificate(this, 'Certificate', {
      domainName: hostedZoneName,
      subjectAlternativeNames: [`*.${zone.zoneName}`],
      region: 'us-east-1',
      hostedZone: zone,
    })
  }
}
