## Available Scripts

In the project directory, you can run:

### `docker-compose up -d`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view serving project in the browser.
Open [http://localhost:6006](http://localhost:6006) to view storybook.

### `docker-compose down`

Stop Running app

### `docker-compose logs -f`

See logs of serving react project

### `yarn run docker:add <package name>`

If you wanted to add a package while docker-compose was running your app

### `adding environment variable`

You need to add env name to file `/prod/env-list` or `/prod/branch-env-list` and circle ci environment settings. So that we can get env from circle and generate to .env.production for building image. [see more detail](https://github.com/20Scoops-CNX/documents-developer/blob/master/frontend/frontend-guidelines.md#%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89-environment-variable)

## Environment Variable

`DANGER_GITHUB_API_TOKEN`

github account api token for danger bot to use for commenting code (use 20scoops bot account, please ask developer)

`REACT_APP_SERVER`

specify it's localhost, development, staging, production so that we can run code base on this environment (for example, remove redux-logger when `REACT_APP_SERVER` is staging or production)

`REACT_APP_API_URL`

specify api service path (if needed) for using in `constants/api-endpoints.js`.

## Deploy with github action

You need to add following environment variables in Github website.

`SSH_HOST`

SSH_HOST is IP address of server.
Need to add SSH_HOST in github project which you can add via `Secrets` section in project setting.

`SSH_Key`

SSH_Key is private key of server
Need to add SSH Key in github project which you can add via `Secrets` section in project setting.

**Ex. steps deploy in .github/workflows/main.yml**

### Deploy SCP

```yml
build-and-deploy:
  name: Build and Deploy Production
  runs-on: ubuntu-latest
  needs: install-and-check

  if: github.event_name == 'push' && (endsWith(github.ref, 'master'))
  steps:
    - uses: actions/checkout@master

    - name: Install
      run: yarn

    - name: Bundle Application
      run: |
        ./generate-env --env=${GITHUB_REF#refs/heads/}
        yarn build

    - name: Deploy develop server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }} #Default is centos
        key: ${{ secrets.SSH_Key }}
        port: ${{ secrets.PORT }} #Default is 22
        source: 'build'
        target: '/var/www/project-name/html'
```

### Deploy S3

```yml
build-and-deploy:
  name: Build and Deploy Production
  runs-on: ubuntu-latest
  needs: install-and-check

  if: github.event_name == 'push' && (endsWith(github.ref, 'master'))
  steps:
    - uses: actions/checkout@master

    - name: Install
      run: yarn

    - name: Bundle Application
      run: |
        ./generate-env --env=${GITHUB_REF#refs/heads/}
        yarn build

    - name: Deploy to S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --delete --cache-control 'public, max-age=0, must-revalidate'
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'eu-central-1'
        SOURCE_DIR: 'build'
```

If you want to deploy different bucket based on multiple environment, you can use `set-output` for setting bucket name.

```yml
- name: Add Branches Name
  run: |
    BRANCH_NAME=${GITHUB_REF#refs/heads/}
    if [ "$BRANCH_NAME" == "develop" ]
    then
    echo "##[set-output name=branch_name;]develop-bucket.com"
    elif [ "$BRANCH_NAME" == "staging" ]
    then
    echo "##[set-output name=branch_name;]staging-bucket.com"
    elif [ "$BRANCH_NAME" == "master" ]
    then
    echo "##[set-output name=branch_name;]prod-bucket.com"
    fi
  id: extract_branch_name
- name: Deploy to S3
  uses: jakejarvis/s3-sync-action@master
  env:
    AWS_S3_BUCKET: ${{ steps.extract_branch_name.outputs.branch_name }}
```

#### Deploy s3 with cloudflare

You need to purge cache (clear cache) in cloudflare after deploying to s3

```yml
# Deploy to s3
- name: Purge Cloudflare
  run: ./purge
  env:
    CF_ZONE_ID: ${{secrets.CF_ZONE_ID}}
    CF_API_TOKEN: ${{secrets.CF_API_TOKEN}}
```
