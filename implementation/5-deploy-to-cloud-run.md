# 5. Deploy to Cloud Run

While our CI/CD pipeline will handle automatic deployments, it's useful to know how to deploy manually. This can be helpful for initial setup or troubleshooting.

## Manual Deployment to Cloud Run

1. Ensure you're in the correct project:

   ```bash
   gcloud config set project insilicostrategy
   ```

2. Build and push your Docker image to Artifact Registry:

   ```bash
   docker build -t us-central1-docker.pkg.dev/insilicostrategy/frontend-repo/frontend:latest .
   docker push us-central1-docker.pkg.dev/insilicostrategy/frontend-repo/frontend:latest
   ```

3. Deploy to Cloud Run:

   ```bash
   gcloud run deploy insilicostrategy \
     --image us-central1-docker.pkg.dev/insilicostrategy/frontend-repo/frontend:latest \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

   This command will deploy your container to Cloud Run and provide a URL where your application is accessible.

## Verify the Deployment

1. After deployment, Cloud Run will display a Service URL. Open this URL in a web browser to verify that your application is running correctly.

2. You can also list your Cloud Run services to get information about your deployment:

   ```bash
   gcloud run services list --platform managed
   ```

## Configure Automatic Deployments (if not done in previous step)

If you haven't set up the Cloud Build trigger in the previous step, you can do it now:

1. Go to the Cloud Console: https://console.cloud.google.com/
2. Navigate to Cloud Build > Triggers
3. Click "Create Trigger"
4. Fill in the details:
   - Name: `frontend-trigger`
   - Event: "Push to a branch"
   - Source: Select your GitHub repository and branch (e.g., `^main$`)
   - Configuration: "Cloud Build configuration file (yaml or json)"
   - Cloud Build configuration file location: `/cloudbuild.yaml`
5. Click "Create"

## Manage Revisions

Cloud Run keeps track of your deployments as revisions. You can manage these revisions:

1. List revisions:

   ```bash
   gcloud run revisions list --service insilicostrategy --region us-central1
   ```

2. To rollback to a previous revision:

   ```bash
   gcloud run services update-traffic insilicostrategy --to-revisions=REVISION_NAME=100
   ```

   Replace `REVISION_NAME` with the name of the revision you want to roll back to.

## Monitor Your Deployment

1. View logs:

   ```bash
   gcloud run logs read --service insilicostrategy
   ```

2. View service details:

   ```bash
   gcloud run services describe insilicostrategy
   ```

Your application is now deployed to Cloud Run and accessible via the provided URL. The CI/CD pipeline will automatically deploy new versions when you push changes to your main branch on GitHub.
