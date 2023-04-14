import "./App.css";
// components
import BooList from "./components/bookList";
// apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// initialise apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="">
        <h1>hello world</h1>
        <BooList />
      </div>
    </ApolloProvider>
  );
}

export default App;
