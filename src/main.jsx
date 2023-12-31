import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import config from "./amplifyconfiguration.json";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure(config);
const { endpoint } = config.aws_cloud_logic_custom[0];

async function getToken() {
  const data = (await fetchAuthSession()).tokens ?? {};
  const token = data.idToken.toString();
  return token;
}

const httpLink = new HttpLink({ uri: endpoint + "/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  return getToken().then((token) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return forward(operation);
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
