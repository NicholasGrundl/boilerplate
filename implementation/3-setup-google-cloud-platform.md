# 3. Set up Google Cloud Platform

## Install and initialize gcloud CLI

1. If you haven't already, install the Google Cloud SDK (which includes the gcloud CLI) by following the instructions for your operating system: https://cloud.google.com/sdk/docs/install

2. Once installed, open a new terminal window and run:

   ```bash
   gcloud init
   ```

3. Follow the prompts to log in and select your Google Cloud account.

## Create a new GCP project

1. Set your project name:

   ```bash
   export PROJECT_ID="issfrontend"
   ```

2. Create the new project:

   ```bash
   gcloud projects create $PROJECT_ID
   ```

3. Set the newly created project as the current project:

   ```bash
   gcloud config set project $PROJECT_ID
   ```

## Enable required APIs

Run the following commands to enable the necessary APIs:

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

## Set up Artifact Registry

1. Create a new repository for Docker images:

   ```bash
   gcloud artifacts repositories create frontend-repo \
       --repository-format=docker \
       --location=us-central1 \
       --description="Docker repository for frontend"
   ```

2. Configure Docker to use gcloud as a credential helper:

   ```bash
   gcloud auth configure-docker us-central1-docker.pkg.dev
   ```

## Set up billing for your project

1. List your billing accounts:

   ```bash
   gcloud billing accounts list
   ```

2. Note the `ACCOUNT_ID` for the billing account you want to use.

3. Link your project to the billing account:

   ```bash
   gcloud billing projects link $PROJECT_ID --billing-account=ACCOUNT_ID
   ```

   Replace `ACCOUNT_ID` with the actual ID from step 1.

## (Optional) Set up a service account

If you want to use a service account for deployments:

1. Create a new service account:

   ```bash
   gcloud iam service-accounts create frontend-sa \
       --description="Service account for frontend" \
       --display-name="frontend-sa"
   ```

2. Grant necessary roles to the service account:

   ```bash
   gcloud projects add-iam-policy-binding $PROJECT_ID \
       --member="serviceAccount:frontend-sa@$PROJECT_ID.iam.gserviceaccount.com" \
       --role="roles/run.admin"

   gcloud projects add-iam-policy-binding $PROJECT_ID \
       --member="serviceAccount:frontend-sa@$PROJECT_ID.iam.gserviceaccount.com" \
       --role="roles/storage.admin"

   gcloud projects add-iam-policy-binding $PROJECT_ID \
       --member="serviceAccount:frontend-sa@$PROJECT_ID.iam.gserviceaccount.com" \
       --role="roles/artifactregistry.admin"
   ```

3. Create and download a key for the service account:

   ```bash
   gcloud iam service-accounts keys create frontend-sa-key.json \
       --iam-account=frontend-sa@$PROJECT_ID.iam.gserviceaccount.com
   ```

   Keep this key file secure and do not commit it to version control.

Now your Google Cloud Platform environment is set up and ready for deploying your application.
