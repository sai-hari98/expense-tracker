package com.expensetracker.expenseservice.utility;

import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import software.amazon.awssdk.services.secretsmanager.model.SecretsManagerException;

@Component
public class AWSUtility {
    public String getSecretValue(String secretName){
        SecretsManagerClient secretsClient = SecretsManagerClient.builder()
                .region(Region.US_EAST_2)
                .credentialsProvider(ProfileCredentialsProvider.create())
                .build();
        try {
            GetSecretValueRequest valueRequest = GetSecretValueRequest.builder()
                    .secretId(secretName)
                    .build();
            GetSecretValueResponse valueResponse = secretsClient.getSecretValue(valueRequest);
            String secret = valueResponse.secretString();
            return secret;
        } catch (SecretsManagerException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            throw new RuntimeException("Exception in accessing secret");
        }
    }
}
