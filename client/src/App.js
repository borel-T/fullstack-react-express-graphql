import "./App.css";
// components
import BookList from "./components/bookList";
import BookForm from "./components/bookForm";
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
        <BookList />
        <BookForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
