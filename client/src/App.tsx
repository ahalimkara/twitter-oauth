import React from 'react';
import { SWRConfig } from 'swr';

import './App.css';
import Home from './Home';

const fetchOptions: any = {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
};

const App: React.FC = () => {
  return (
    <div className="App">
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          refreshInterval: 0,
          fetcher: (url: string) => fetch(url, fetchOptions).then((res: any) => res.json()),
        }}
      >
        <header className="App-header">
          <Home />
        </header>
      </SWRConfig>
    </div>
  );
};

export default App;
