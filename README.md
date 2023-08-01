# **Salesforce Lead Gen Chat Starter Template**

## **Overview**

_The Salesforce Lead Gen Chat Starter Template includes an example Chat configuration that will gather contact information for prospects interested in a demo and create a new contact in Salesforce._

## **What’s Included**

### Chat

This template includes a Chat configuration focused on gathering contact information and creating contacts in Salesforce for prospects interested in a product demo.

### Plugins

This template includes a plugin with a custom typescript function to handle the programmatic creation of contacts in Salesforce.

## **Installation Guide**

### Pre-requisites

#### Yext

This template requires access to the following Yext products:

- Chat

#### Salesforce

This template requires the creation of a Connected App within Salesforce. This will allow access to the APIs required to create new contacts. Follow the instructions below to create the Connected App:

1. In Salesforce Setup, navigate to **Apps > App Manager**.
2. Click **New Connected App**.
3. Provide a name and contact email for the app.
4. In the API section, click **Enable OAuth Settings**.
5. Add [https://login.salesforce.com/services/oauth2/callback](https://login.salesforce.com/services/oauth2/callback) as the **Callback URL**.
6. In the Selected OAuth Scopes section, add **Full access (full)** as a Selected Scope.
7. Click to **Enable Client Credentials Flow**. Hit **Save** and **Continue**.
8. Once you are redirected to the new Connected App, click **Manage Consumer Details** in the API section.
9. Keep the **Consumer Key** and **Consumer Secret** on hand as they will be required inputs during the installation of the template.
10. Now you’re ready to proceed with the template installation!

### How to Install

1. In the Yext platform, navigate to **Apps > Solutions**.
2. Select the **Salesforce Lead Gen Chat Starter Template**.
3. Click **View Solution**. This will open up the Admin Console, an account configuration tool that will allow you to add all of the resources mentioned above to your account.
4. In the upper right corner, click **Apply**.
5. A modal window will open and prompt you to **enter your Account ID**. You can quickly find this in the URL of your Yext account, which takes the form of “[www.yext.com/s/{accountId}/…](http://www.yext.com/s/{accountId}/…)”. Enter the ID and click **Continue**.
6. In the new modal, click **Start authorization flow**. This will open a new window. When prompted, click **Authorize**. Once you receive authorization confirmation, navigate back to the Admin Console window and click **Continue**.
7. A new modal window will open and prompt you to input several values:
   1. <span style="text-decoration:underline;">Company</span> - The name of your company to be used in your chatbot’s greeting message.
   2. <span style="text-decoration:underline;">Salesforce Client ID</span> - This is the Consumer Key from your Salesforce Connected App.
   3. <span style="text-decoration:underline;">Salesforce Client Secret</span> - This is the Consumer Secret from your Salesforce Connected App.
   4. <span style="text-decoration:underline;">Salesforce Instance URL</span> - This should be the full URL of your Salesforce Instance which will be used in the Create Contact API call. You can find this value by navigating to Setup > My Domain.
   5. <span style="text-decoration:underline;">Salesforce API Version</span> - The API version associated with your Salesforce instance. This needs to take the format of “v58.0”, adjusting with your version number. To find this, navigate to Setup > API. Click “Generate Enterprise WSDL”. Click “Generate” and you’ll be redirected to a page showing the API Version near the top.
8. Enter these values and click **Save**.
9. A window will pop up showing all of the resources that will be added / edited within your account. Click **Continue** and, when prompted, click **Confirm**.
10. In the Console, you’ll see the message “Applying resources…”. Wait while the resources are applied. You’ll see messages in the console for each resource that is applied and will eventually receive a message saying “Successfully applied resources”.
11. You’re done! All of the template’s resources have been added to your account. Jump back into your Yext account and explore your new resources!
