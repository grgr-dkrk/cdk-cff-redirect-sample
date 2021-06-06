/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */

import { CloudFrontRequest } from 'aws-lambda'

type CloudFrontFunctionRequest = CloudFrontRequest & {
  request: CloudFrontRequest & {
    headers: {
      host: {
        value: string
      }
    }
  }
}

type CloudFrontFunctionResult =
  | {
      statusCode: number
      statusDescription?: string
      headers: {
        location: {
          value: string
        }
      }
    }
  | CloudFrontRequest

function handler(event: CloudFrontFunctionRequest): CloudFrontFunctionResult {
  var request = event.request
  var uri = request.uri
  var host = request.headers.host.value
  var newUrl = `https://${host}/bar/`

  // redirect
  if (uri.match(/^\/foo\/?/)) {
    console.log(`redirect: ${uri} to /bar/`)
    return {
      statusCode: 301,
      statusDescription: 'Found',
      headers: {
        location: {
          value: newUrl,
        },
      },
    }
  }

  // rewrite
  var normalizedUri: string
  var INDEX_PATH = 'index.html' as const
  var extension = /(?:\.([^.]+))?$/.exec(uri)

  if (extension && extension[1]) {
    normalizedUri = uri
  } else {
    normalizedUri = uri.endsWith('/')
      ? `${uri}${INDEX_PATH}`
      : `${uri}/${INDEX_PATH}`
  }

  return { ...request, uri: normalizedUri }
}
