const { GetCallerIdentityCommand, STSClient } = require('@aws-sdk/client-sts');
const { decrypt } = require('databag');
const EncryptedPrivateConfig = require('./private.config.json');

const DATABAG_PASSWORD = process.env.BAREBONE_NEXT_DATABAG_PASSWORD;

const PrivateConfig = decrypt(EncryptedPrivateConfig, DATABAG_PASSWORD);
const { aws } = PrivateConfig.data.development;

console.log(aws);

const client = new STSClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
  },
});

async function main() {
  const out = await client.send(new GetCallerIdentityCommand({}));
  console.log(out);
}

main();
