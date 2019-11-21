import React from 'react';
import useSWR  from 'swr';

import './App.css';

const API_URI = 'http://localhost:8080/';

const Home: React.FC = () => {
  const { data, error } = useSWR(`${API_URI}profile`);
  const user = data && data.authenticated ? data.user : null;

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <>
      {
        error && <p className="error">Failed to load user data</p>
      }
      {
        user && <p>Welcome {user && user.name}</p>
      }
      {
        !user && <a className="App-link" href={`${API_URI}auth/twitter`}>Login</a>
      }
    </>
  );
};

export default Home;
