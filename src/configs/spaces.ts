import AWS from 'aws-sdk';

import { spacesAccessKey as accessKeyId, spacesSecretKey as secretAccessKey } from '../configs';

const spacesEndpoint = (new AWS.Endpoint(
  'https://nyc3.digitaloceanspaces.com'
) as unknown) as string;

export const spaces = new AWS.S3({ accessKeyId, secretAccessKey, endpoint: spacesEndpoint });
