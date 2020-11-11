# ListBee - Grocery List App

This project was made for all the grocery shoppers that needs a tool to organize their shopping list and share it among friends. 

🛠 Built with React Native, Expo, GraphQL, AWS Amplify, Amplify DataStore, AWS AppSync

### Platform Compatibility

| Web | Android | iOS |
| --- | --- | --- |
| ✔️ |✔️ | ❌ |
| [Web Listing](https://master.d22bl963x1qfmv.amplifyapp.com/)| [Play Store Listing](https://play.google.com/store/apps/details?id=com.hmisonne.ListBee) | |

![Screenshots](./demo/ListBeeAppListing.JPG)

### Features

- 👮‍ Authenticated
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
 - A user can add to his dashboard multiple grocery lists which can be shared among multiple users. To create this **many-to-many** relationship, I added the UserGroceryListJoin table. 
 - After creating a new grocery list, products can be added to this specific list. This is a **one-to-many** relationship. 

 NB: Ideally a user should only have access to the grocery lists he created or that I was given access to. Unfortunately, having an editors field populated with Authentification Data is not currently compatible with Amplify DataStore. See [Issue #7069](https://github.com/aws-amplify/amplify-js/issues/7069)

```graphql
type Product @model 
{
  id: ID!
  groceryList: GroceryList @connection(name: "GroceryListProducts")
  name: String!
  checked: Boolean!
  unit: String!
  quantity: Int!
  category: String!
}

type GroceryList @model {
  id: ID!
  name: String!
  description: String
  products: [Product] @connection(name: "GroceryListProducts")
  users: [UserGroceryListJoin] @connection(keyName: "byUser", fields: ["id"])
}

type User @model {
  id: ID!
  sub: String!
  groceryLists: [UserGroceryListJoin] @connection(keyName: "byGroceryList", fields: ["id"])
}

type UserGroceryListJoin @model(queries: null)
  @key(name: "byUser", fields: ["userID", "groceryListID"])
  @key(name: "byGroceryList", fields: ["groceryListID", "userID"]){
  id: ID!
  userID: ID!
  groceryListID: ID!
  user: User! @connection(fields: ["userID"])      
  groceryList: GroceryList! @connection(fields: ["groceryListID"])  
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


## Resources

* AWS Amplify React tutorial: https://docs.amplify.aws/start/getting-started/installation/q/integration/react
* AWS AppSync Resources: https://aws.amazon.com/appsync/resources/
* Point of Sale app: https://github.com/amazon-archives/aws-appsync-refarch-offline
* Amplify doc: https://docs.amplify.aws/lib/q/platform/js
* Caching Fonts: https://docs.expo.io/guides/preloading-and-caching-assets/
* Icons used for buttons and design : https://icons.expo.fyi/
