import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AllUsers } from "./components/AllUsers";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4040/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <AllUsers />
    </ApolloProvider>
  );
}

export default App;
