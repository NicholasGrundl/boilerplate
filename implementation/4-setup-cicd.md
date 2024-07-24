# 4. Set up Continuous Integration/Continuous Deployment

## Create cloudbuild.yaml file

1. In the root directory of your `frontend` project, create a new file named `cloudbuild.yaml`.

2. Open `cloudbuild.yaml` in your text editor and add the following content:

   ```yaml
   steps:
   # Build the container image
   - name: 'gcr.io/cloud-builders/docker'
     args: ['build', '-t', 'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:$COMMIT_SHA', '.']

   # Push the container image to Artifact Registry
   - name: 'gcr.io/cloud-builders/docker'
     args: ['push', 'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:$COMMIT_SHA']

   # Deploy container image to Cloud Run
   - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
     entrypoint: gcloud
     args:
     - 'run'
     - 'deploy'
     - 'frontend'
     - '--image'
     - 'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:$COMMIT_SHA'
     - '--region'
     - 'us-central1'
     - '--platform'
     - 'managed'
     - '--allow-unauthenticated'

   # Tag the image as 'latest'
   - name: 'gcr.io/cloud-builders/docker'
     args: ['tag', 
            'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:$COMMIT_SHA',
            'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:latest']

   - name: 'gcr.io/cloud-builders/docker'
     args: ['push', 'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend:latest']

   images:
   - 'us-central1-docker.pkg.dev/$PROJECT_ID/frontend-repo/frontend'
   ```

3. Save the file.

## Set up GitHub integration with Cloud Build

1. Go to the Google Cloud Console: https://console.cloud.google.com/

2. Navigate to Cloud Build > Triggers

3. Click on "Connect Repository"

4. Select GitHub as the source and follow the prompts to authenticate and select your repository

5. Once connected, click "Create Trigger"

6. Fill in the trigger settings:
   - Name: `frontend-trigger`
   - Event: Choose "Push to a branch"
   - Source: Select your repository and branch (e.g., `^main$` for the main branch)
   - Configuration: Select "Cloud Build configuration file (yaml or json)"
   - Cloud Build configuration file location: `/cloudbuild.yaml`

7. Click "Create" to finish setting up the trigger

## (Optional) Set up branch protection rules

In your GitHub repository:

1. Go to Settings > Branches

2. Click "Add rule" next to "Branch protection rules"

3. In "Branch name pattern", enter `main` (or your primary branch name)

4. Check the following options:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging

5. Click "Create" to add the rule

These branch protection rules will ensure that code is reviewed and CI checks pass before being merged into your main branch.

## Trigger builds

Your CI/CD pipeline is now set up. It will automatically trigger builds and deployments when you push to the main branch of your GitHub repository. You can also manually trigger builds from the Cloud Build Triggers page in the Google Cloud Console.

Remember to commit and push your `cloudbuild.yaml` file to your GitHub repository:

```bash
git add cloudbuild.yaml
git commit -m "Add Cloud Build configuration"
git push origin main
```

This should trigger your first build and deployment!
