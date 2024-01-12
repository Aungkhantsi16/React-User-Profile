import { useEffect, useState } from "react";

const url = "https://api.github.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getUsers() {
    const response = await fetch(url);
    const users = await response.json();

    if (response.status > 300) {
      setIsError(true);
      setIsLoading(false);
    }

    setUsers(users);
    setIsLoading(false);
    console.log(users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  console.log("component is rendered");
  if (isLoading) {
    return <h1>Loading......</h1>;
  }
  if (isError) {
    return <h1>Opps Error...</h1>;
  }
  return (
    <div className="container">
      <h1>GitHub Users</h1>
      <ul className="users">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <img src={user.avatar_url} alt={user.login} />
              <h4>{user.login}</h4>
              <a href={user.html_url}>Profile</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
