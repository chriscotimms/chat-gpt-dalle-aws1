// 'use strict'

// const AWS = require('aws-sdk'); 

// class SecretsManager {

//     /**
//      * Uses AWS Secrets Manager to retrieve a secret
//      */
//     static async getSecret (secretName, region){
//         const config = { region : region }
//         var secret, decodedBinarySecret;
//         let secretsManager = new AWS.SecretsManager(config);
//         try {
//             let secretValue = await secretsManager.getSecretValue({SecretId: secretName}).promise();
//             if ('SecretString' in secretValue) {
//                 return secret = secretValue.SecretString;
//             } else {
//                 let buff = new Buffer(secretValue.SecretBinary, 'base64');
//                 return decodedBinarySecret = buff.toString('ascii');
//             }
//         } catch (err) {
//             if (err.code === 'DecryptionFailureException')
//                 // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
//                 // Deal with the exception here, and/or rethrow at your discretion.
//                 throw err;
//             else if (err.code === 'InternalServiceErrorException')
//                 // An error occurred on the server side.
//                 // Deal with the exception here, and/or rethrow at your discretion.
//                 throw err;
//             else if (err.code === 'InvalidParameterException')
//                 // You provided an invalid value for a parameter.
//                 // Deal with the exception here, and/or rethrow at your discretion.
//                 throw err;
//             else if (err.code === 'InvalidRequestException')
//                 // You provided a parameter value that is not valid for the current state of the resource.
//                 // Deal with the exception here, and/or rethrow at your discretion.
//                 throw err;
//             else if (err.code === 'ResourceNotFoundException')
//                 // We can't find the resource that you asked for.
//                 // Deal with the exception here, and/or rethrow at your discretion.
//                 throw err;
//         }
//     } 
// }
// module.exports = SecretsManager;



// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html




// import {
//     SecretsManagerClient,
//     GetSecretValueCommand,
//   } from "@aws-sdk/client-secrets-manager";
  
  const {
    SecretsManagerClient,
    GetSecretValueCommand,
  } = require("@aws-sdk/client-s3"); 

  const secret_name = "openai-api-key";
  
  const client = new SecretsManagerClient({
    region: "eu-north-1",
  });
  
  let response;
  
  async function getCode() {
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  const secret = response.SecretString;
  console.log(secret);
}
getCode();
  
  
  // Your code goes here