# nodejs-healthcheck.

## 2. Tooling.

### 2.5 Healtcheck.

#### Task.

1. Create a REST service on the port that source code reads from env var PORT.
2. Add to the service endpoint /random. The flow described here. Response format example {"resutl": true}. If response is maybe, then return 500.
3. Add to the service /healthz endpoint. Add ping healtchcheck what uses HEAD http method for checking connectivity with yesno.wtf domain. It should be  returned 200, if service can access the yesno.wtf domain and return 500, if service can not.
4. Add Dockerfile to your project.

#### How to run locally
```shell
docker build -t healthcheck:1.0 .
docker run -d -p 80:80 -e PORT=80 --rm healthcheck:1.0
docker stop $(docker ps -a -q --filter ancestor=healthcheck:1.0 --format="{{.ID}}")
```

### 2.6 Deploy.

#### Task.

1. Deploy your Docker image from healtcheck task to target platform using cli commands.
2. Add deploy instruction including used cli command to Readme.md.
3. Provide link to your running app.

### App running on: http://3.19.27.58/

#### How to run globally (by AWS ECS Fargate)
> **Note**
> Before executing, make sure that you have:
> - built image
> - aws account
> - aws user with AmazonECS_FullAccess and AmazonEC2ContainerRegistryFullAccess roles
> - aws ecsTaskExecutionRole role

1. Configure AWS CLI and login to AWS ECR
```shell
aws configure
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 698445805226.dkr.ecr.us-east-2.amazonaws.com
```
2. Create repository and push image
```shell
aws ecr create-repository --repository-name nodejs-healthcheck --image-scanning-configuration scanOnPush=true --region us-east-2
docker tag healthcheck:1.0 698445805226.dkr.ecr.us-east-2.amazonaws.com/nodejs-healthcheck:1.0
docker push 698445805226.dkr.ecr.us-east-2.amazonaws.com/nodejs-healthcheck:1.0
```
3. Create AWS ECS Fargate cluster and run service
```shell
aws ecs create-cluster --cluster-name nodejs-cluster
aws ecs register-task-definition --cli-input-json  file://aws-ecs-fargate-task-definition.json
aws ecs create-service --cluster nodejs-cluster --service-name nodejs-cluster-service --task-definition nodejs-healthcheck:16 --desired-count 1 --launch-type "FARGATE" --network-configuration "awsvpcConfiguration={subnets=[subnet-91d56cdd],securityGroups=[sg-0caaea902eb0f5632],assignPublicIp=ENABLED}"
```
4. Delete service, cluster and repository
```shell
aws ecs delete-service --cluster nodejs-cluster --service nodejs-cluster-service --force
aws ecs delete-cluster --cluster test-fargate
aws ecr delete-repository --repository-name nodejs-healthcheck --force
```











aws iam add-role-to-instance-profile --instance-profile-name ecsInstanceRole-profile --role-name ecsInstanceRole
aws iam add-role-to-instance-profile \
--instance-profile-name ecsInstanceRole-profile \
--role-name ecsInstanceRole

aws ecr describe-repositories
aws ecr list-images --repository-name nodejs-healthcheck
aws ecs list-task-definitions


"executionRoleArn": "arn:aws:iam::698445805226:role/ecsTaskExecutionRole"
