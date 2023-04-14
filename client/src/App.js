import "./App.css";
// components
import BooList from "./components/bookList";
// apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// initialise apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

try {
  console.log("go:::");
  client
    .query({
      query: gql`
        query GetBooks {
          books {
            name
          }
        }
      `,
    })
    .then((res) => {
      console.log("res:::", res);
    });
} catch (error) {
  console.log(error);
}

function App() {
  return (
    <div className="">
      <h1>hello world</h1>
      <BooList />
    </div>
  );
}

export default App;
