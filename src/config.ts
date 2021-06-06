import * as dotenv from 'dotenv'

dotenv.config()

/**
 * account & region
 */
export const AWS_ACCOUNT = process.env.AWS_ACCOUNT as string
export const AWS_REGION = process.env.AWS_REGION ?? 'us-east-1'
export const env = {
  account: AWS_ACCOUNT,
  region: AWS_REGION,
}

/**
 * Environment
 */
export const ENVIRONMENT_STAGING = 'staging' as const
export const ENVIRONMENT_PRODUCTION = 'production' as const
export type Environment =
  | typeof ENVIRONMENT_STAGING
  | typeof ENVIRONMENT_PRODUCTION

/**
 * Domain
 */
export const DOMAIN_STAGING = process.env.DOMAIN_STAGING as string
export const DOMAIN_PRODUCTION = process.env.DOMAIN_PRODUCTION as string
export type DomainRecord = Record<
  typeof DOMAIN_STAGING | typeof DOMAIN_PRODUCTION,
  string
>
export const domain: DomainRecord = {
  [ENVIRONMENT_STAGING]: DOMAIN_STAGING,
  [ENVIRONMENT_PRODUCTION]: DOMAIN_PRODUCTION,
}

/**
 * HostedZone
 */
export const HOSTED_ZONE_STAGING = process.env.HOSTED_ZONE_STAGING as string
export const HOSTED_ZONE_PRODUCTION = process.env
  .HOSTED_ZONE_PRODUCTION as string
export const hostedZone: Record<Environment, string> = {
  [ENVIRONMENT_STAGING]: HOSTED_ZONE_STAGING,
  [ENVIRONMENT_PRODUCTION]: HOSTED_ZONE_PRODUCTION,
}

/**
 * Policy
 */
export const USER_ARN_STAGING = process.env.USER_ARN_STAGING as string
export const USER_ARN_PRODUCTION = process.env.USER_ARN_PRODUCTION as string
export const principal: Record<Environment, string> = {
  [ENVIRONMENT_STAGING]: USER_ARN_STAGING,
  [ENVIRONMENT_PRODUCTION]: USER_ARN_PRODUCTION,
}

/**
 * Assets
 */
export const ASSETS_WEBSITE = './website' as const
