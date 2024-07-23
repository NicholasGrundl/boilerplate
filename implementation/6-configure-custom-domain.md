# 6. Configure Custom Domain

To use your custom domain with your Cloud Run service, follow these steps:

## 1. Verify Domain Ownership

1. Go to the Google Cloud Console: https://console.cloud.google.com/
2. Navigate to Cloud Run > Domain Mappings
3. Click "Add Mapping"
4. Enter your custom domain name
5. If you haven't verified ownership of the domain yet, you'll be prompted to do so
6. Follow the instructions to add a TXT record to your domain's DNS settings

## 2. Configure DNS Records

1. Go to your domain registrar's website
2. Access the DNS settings for your domain
3. Add a CNAME record:
   - Name: Use `www` if you want to use `www.yourdomain.com`, or `@` for the root domain
   - Value: The URL of your Cloud Run service (e.g., `ghs.googlehosted.com.`)

4. If you want both `www` and the root domain to work, you may need to set up domain forwarding or create an A record, depending on your registrar's capabilities

## 3. Map Custom Domain in Cloud Run

1. In the Google Cloud Console, go to Cloud Run > Domain Mappings
2. Click "Add Mapping"
3. Select your Cloud Run service (issfrontend)
4. Enter your custom domain
5. Click "Continue"
6. Review the settings and click "Add Mapping"

## 4. Set up SSL Certificate

Google Cloud will automatically provision and manage an SSL certificate for your custom domain.

1. Wait for the SSL certificate to be provisioned (this may take up to 24 hours)
2. You can check the status in the Cloud Run > Domain Mappings section

## 5. Test the Custom Domain

1. After DNS propagation (which can take up to 48 hours), visit your custom domain in a web browser
2. Verify that your website loads correctly and that the connection is secure (https)

## 6. (Optional) Set up Redirects

If you want all traffic to use HTTPS and include 'www', you can set up redirects:

1. Go to Cloud Run > Domain Mappings
2. Click on your domain mapping
3. Under "Service," click "Edit"
4. Check the boxes for:
   - "Redirect HTTP to HTTPS"
   - "Redirect to www.yourdomain.com"
5. Click "Update"

## Troubleshooting

If you encounter issues:

1. Verify DNS propagation using a tool like https://www.whatsmydns.net/
2. Check Cloud Run logs for any application errors
3. Ensure your Cloud Run service is set to allow unauthenticated invocations if it's a public website

Remember, DNS changes can take up to 48 hours to fully propagate. If your custom domain doesn't work immediately, wait a day or two before troubleshooting further.
