import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
const query = gql`
  query sayHello {
    hello
  }
`;

function App({ signOut, user }) {
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }
  return (
    <>
      <h1>{data.hello}</h1>
      <h2>I'm {user.username}</h2>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
export default withAuthenticator(App);
