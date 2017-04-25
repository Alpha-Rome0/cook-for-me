# CookForMe

**RELEASE NOTES**

**Release Update: April 24, 2017**

_New Software Features:_
- Database and server functional
- Ability to register an account and login with persistence to access both apps
- Added since last release: Nutrients API functionality added

_Bug Fixes:_
- Checks for existing user before accepting login or registration

_Known Bugs and Defects:_
- No editing recipes via voice
- Too many ingredients could mess up the output on nutrients.
- Registration does not check Alexa ID for uniqueness (hard for third party to replicate)

**INSTALLATION GUIDE - ALEXA SKILL**

_Pre-requisites_

Program to handle zip files or git

_Download Instructions_
With Git:
Clone the CookForMe Github repository into a directory of your choice.
$git clone https://github.com/Mete0/cook-for-me
Without Git:
Download the CookForMe repository as a .zip file via
https://github.com/Mete0/cook-for-me/archive/master.zip
and extract all files into a directory of your choice.

Add the following files and folder to a zip file:
node_modules (folder)
state_helper.js
rest_client.js
package.json
index.js
database_helper.js

_Uploading to AWS_

1. If you do not already have an account on AWS, go to Amazon Web Services and
create an account.
2. Log in to the AWS Management Console and navigate to AWS Lambda.
3. Click the region drop-down in the upper-right corner of the console and select either
US East (N. Virginia)​ or EU (Ireland)​.
4. Lambda functions for Alexa skills must be hosted in either the US East (N. Virginia)
or EU (Ireland)​ region.
5. If you have no Lambda functions yet, click Get Started Now​. Otherwise, click
Create a Lambda Function​.
6. When prompted to configure triggers, click the box and select Alexa Skills Kit, then click
Next.
7. When prompted to configure triggers, click the box and select Alexa Skills Kit​, then
click Next​.
8. Enter a Name​ and Description​ for the function.
9. Select node.js as the runtime
10. For Role​ (under Lambda function handler and role​), select Create custom role.
11. under IAM Role, select Create a new IAM role
12. Enter a Role Name​.
13. From the Policy document add the following code and click allow:
```javascript
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1428341300017",
            "Action": [
                "dynamodb:*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Sid": "",
            "Resource": "*",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Effect": "Allow"
        }
    ]
}
```
14. Select the Triggers​ tab.
15. Click Add trigger​.
16. Click the outlined box and choose Alexa Skills Kit​.
17. Click Submit​.
18. Select the Upload a .ZIP file​ option and upload the zip file you created earlier.
19. Make note of the Amazon Resource Name (ARN) for your new Lambda function.

The ARN​ is displayed in the upper-right corner of the function page.


_Creating the Alexa Skill_

Log on to the Developer Portal.

1. Navigate to the Alexa section by clicking Apps & Services​ and then clicking Alexa
in the top navigation.
2. In the Alexa Skills Kit box, click Get Started.​
3. Find the skill in the list and click Edit​.
4. On the Skill Information page, copy the Application Id​ shown.
5. Fill in the information on the Skill Information page
6. Click on Interation Model
7. Copy paste the following information into the Intent Schema:

```javascript
{
    "intents": [
        {
            "intent": "AMAZON.CancelIntent"
        },
        {
            "intent": "AMAZON.StopIntent"
        },
        {
            "intent": "AMAZON.HelpIntent"
        },
        {
            "intent": "load_intent"
        },
        {
            "slots": [
                {
                    "name": "CONTINUE",
                    "type": "CONTINUETYPE"
                }
            ],
            "intent": "continueIntent"
        },
        {
            "slots": [
                {
                    "name": "SEARCH",
                    "type": "SEARCHTYPE"
                }
            ],
            "intent": "searchIntent"
        },
        {
            "slots": [
                {
                    "name": "QUERY",
                    "type": "AMAZON.Food"
                }
            ],
            "intent": "queryIntent"
        },
        {
            "intent": "storedRecipesIntent"
        },
        {
            "intent": "beginSearchIntent"
        },
        {
            "slots": [
                {
                    "name": "SELECT",
                    "type": "AMAZON.NUMBER"
                }
            ],
            "intent": "selectIntent"
        },
        {
            "intent": "ingredients_intent"
        },
        {
            "slots": [
                {
                    "name": "MULTIPLIER",
                    "type": "AMAZON.NUMBER"
                }
            ],
            "intent": "multiplier_intent"
        },
        {
            "slots": [
                {
                    "name": "STEPS_SELECTION",
                    "type": "STEPS_CHOICE"
                }
            ],
            "intent": "steps_choice_intent"
        },
        {
            "slots": [
                {
                    "name": "USERSTEP",
                    "type": "STEPS_MOVE"
                }
            ],
            "intent": "step_by_step_intent"
        },
        {
            "intent": "save_intent"
        }
    ]
}
```

8. Add the following custom slot types
(^&(&^%*^$&%#%$^*%&^%^$#%$^)) JAy INSERt PICTURE

9. Copy/paste the following into _Sample Utterances_
```javascript
load_intent favorite
load_intent load favorite
load_intent favorites
load_intent load favorites
load_intent saved
load_intent load saved
load_intent favorite recipe
load_intent load favorite recipe
load_intent favorites recipe
load_intent load favorites recipe
load_intent saved recipe
load_intent load saved recipe
load_intent favorite recipes
load_intent load favorite recipes
load_intent favorites recipes
load_intent load favorites recipes
load_intent saved recipes
load_intent load saved recipes
continueIntent {CONTINUE}
searchIntent search {SEARCH}
searchIntent find {SEARCH}
searchIntent search by {SEARCH}
searchIntent find by {SEARCH}
queryIntent {QUERY}
storedRecipesIntent stored recipes
beginSearchIntent begin search
selectIntent {SELECT}
ingredients_intent what ingredients
ingredients_intent what are ingredients
ingredients_intent what the ingredients
ingredients_intent what are the ingredients
multiplier_intent multiplier {MULTIPLIER}
multiplier_intent set multiplier {MULTIPLIER}
multiplier_intent multiplier to {MULTIPLIER}
multiplier_intent set multiplier to {MULTIPLIER}
steps_choice_intent {STEPS_SELECTION}
step_by_step_intent {USERSTEP}
step_by_step_intent {USERSTEP} step
save_intent save
save_intent save recipe
```

10. Under the Configuration ​tab, add the ARN that you recorded previously
11. Under the Test ​tab, you may now enable and test the skill

**INSTALLATION GUIDE - WEBAPP**

_Pre-requisites_

Any system, preferably built on Unix, is capable of running CookForMe. The system must have internet access in order to connect to Amazon servers for database storage.

_Dependent Libraries_

Node.js (v6.10.2 or above)
All node packages as specified by included package.json files
Git, though it is not necessary for downloading.

_Download Instructions_

With Git:
Clone the CookForMe Github repository into a directory of your choice.
$git clone https://github.com/Mete0/cook-for-me

Without Git:
Download the CookForMe repository as a .zip file via
https://github.com/Mete0/cook-for-me/archive/master.zip
and extract all files into a directory of your choice.

_Build Instructions_

The application comes with libraries that will build the application when it is run.

_Installation of actual application_

1. In the CookForMe root directory, run npm install.
2. Next, navigate into the webapp directory, and run npm install.
3. From the root directory, the list of commands needed should look like:
$npm install
$cd webapp
$npm install

4. In order for the server file to work, it needs the credentials to your database. This web instance connects to Amazon's DynamoDB database using the Dynasty library - in order to successfully deploy the server, you must create a database on DynamoDB and store its credentials in the server folder under the filename $credentials.json.


Your credentials.json file should look like the one below, with your values inserted:
```javascript
{  
   "User name":"YourUserName",
   "Password":"YourPassword",
   "accessKeyId":"YourAccessKey",
   "secretAccessKey":"YourSecretAccessKey",
   "Console login link":"YourConsoleLoginLink"
}
```

This information should be provided to you upon setting up DynamoDB, so it should be a copy/paste into the correct filename in the server directory.

5. The application should now have all the node dependencies it needs to run.

_Database setup_
1. Log in to the AWS Management Console and navigate to AWS DynamoDB.
2. Under Dashboard click on Create Table
3. Under table name, put in Chef_Assist_Data
4. Under primary key, put in userId
5. Click on the create button.

_Run Instructions_

1. In the webapp directory, the frontend component and backend need to be run separately. Two separate terminal tabs or windows should be open.
2. In the webapp directory, execute the following command:
$npm run start
3. In the server directory within webapp, and in a separate tab, execute the following command:
$node index.js
4. Both webapp components should now be running.











