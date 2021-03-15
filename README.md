# ListBee - Grocery List App

This project was made for all the grocery shoppers that needs a tool to organize their shopping list and share it among friends. 

🛠 Built with React Native, Expo, GraphQL, AWS Amplify, Amplify DataStore, AWS AppSync

### Platform Compatibility

| Android | iOS | 
| --- | --- | 
|✔️ | ✔️ |
| [Play Store Listing](https://play.google.com/store/apps/details?id=com.hmisonne.ListBee) |[App Store Listing](https://apps.apple.com/us/app/listbee-grocery-shopping-list/id1542615662) |

![Screenshots](./demo/ListBeeAppListing2.JPG)

### Features

- 👮‍ Authentication
- 🔥 Serverless back end
- 🚀 GraphQL
- 👻 Offline and delta sync capabilities

## Architecture Overview

To deploy the backend of this app, I chose to use Amplify.
> AWS Amplify is an end-to-end solution that enables mobile and front-end web developers to build and deploy secure, scalable full stack applications, powered by AWS.

With Amplify, I was able to add Authentification to my app with AWS Cognito, build a GraphQL API that interacts with DynamoDB and add DataStore to offer offline synchronization.

Here is an overview of the architecture deployed to allow offline synchronization:
![Architecture](./demo/appsync-architecture.png)

This architecture allowed me to only interact with the DataStore API using standard JavaScript function invocations. 

## GraphQL Schema

This app has 3 models Product, GroceryList and User. 
 - A user can add to his/her dashboard multiple grocery lists which can be shared among multiple users. 
 - After creating a new grocery list, products can be added to a specific list. This is a **one-to-many** relationship. 


```graphql
type Product @model 
@key(name: "productByGroceryList", fields: ["groceryListID"])
{
  id: ID!
  groceryListID: ID!
  name: String!
  checked: Boolean!
  unit: String!
  quantity: Int!
  category: String!
  toBuy: Boolean
}

type GroceryList @model {
  id: ID!
  name: String!
  description: String
  products: [Product] @connection(keyName: "productByGroceryList", fields: ["id"])
  shoppers: [String]
}

type User @model 
@auth(rules: [{ allow: owner }])
{
  id: ID!
  sub: String!
  username: String
  groceryLists: [String]
}
```

## Deploy the App

### Prerequisites

In order to run this app, make sure the following dependencies are installed in your computer:

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/)
* [Expo CLI](https://docs.expo.io/get-started/installation)
* [iOS](https://docs.expo.io/workflow/ios-simulator) or [Android](https://docs.expo.io/workflow/android-studio-emulator) simulator
* [Amplify CLI](https://github.com/aws-amplify/amplify-cli#install-the-cli)

### Deploy the back end

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/hmisonne/Amplify_GroceryApp.git
~ cd Amplify_GroceryApp
~ npm install
```

2. Initialize the Amplify project

Run the following commands and make sure you have access to an AWS account:

```sh
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y
```

3. Deploy the backend to your AWS account

```sh
~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```

### Update the API and models

1. Update the amplify project
```sh
~ amplify update api
~ amplify push
```

2. Update the DataStore
```sh
~ npm run amplify-modelgen
```

### Run the front end on your local machine

Start the app

```sh
~ npm start
```

## Current limitations: 

- Currently the AWS Datastore does not provide support to an array of owners using the **@auth** [authorization rule](https://docs.amplify.aws/lib/datastore/setup-auth-rules/q/platform/js), [issue 7069](https://github.com/aws-amplify/amplify-js/issues/7069). 
> This rule limit which individuals or groups should have access to create, read, update, or delete data on your types by specifying an @auth directive

To allow users to share multiple lists with multiple users, I am using [Selective Sync](https://docs.amplify.aws/lib/datastore/sync/q/platform/js#selectively-syncing-a-subset-of-your-data) to prevent the DataStore from downloading the entire content of the cloud database and only get a subset of the data by defining a predicate. This predicates, in my case is the list of **grocery list id** that is stored per user under 'groceryLists'.

## Resources

* AWS Amplify React tutorial: https://docs.amplify.aws/start/getting-started/installation/q/integration/react
* AWS AppSync Resources: https://aws.amazon.com/appsync/resources/
* Point of Sale app: https://github.com/amazon-archives/aws-appsync-refarch-offline
* Amplify doc: https://docs.amplify.aws/lib/q/platform/js
* Caching Fonts: https://docs.expo.io/guides/preloading-and-caching-assets/
* Icons used for buttons and design : https://icons.expo.fyi/
* React UI Library: https://callstack.github.io/react-native-paper/
