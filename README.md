# nodejs-healthcheck.

## 2. Tooling.

### 2.5 Healtcheck.

#### Task.

1. Create a REST service on the port that source code reads from env var PORT.
2. Add to the service endpoint /random. The flow described here. Response format example {"resutl": true}. If response is maybe, then return 500.
3. Add to the service /healthz endpoint. Add ping healtchcheck what uses HEAD http method for checking connectivity with yesno.wtf domain. It should be  returned 200, if service can access the yesno.wtf domain and return 500, if service can not.
4. Add Dockerfile to your project.

#### How to build
docker build --network=host -t healthcheck:1.0 .
docker run -d -p 3000:3000 -e PORT=3000 --rm healthcheck:1.0
docker stop $(docker ps -a -q --filter ancestor=healthcheck:1.0 --format="{{.ID}}")

