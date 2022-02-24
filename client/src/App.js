import './index.css';
import React, { useEffect, useState } from 'react'
import HomePage from './HomePage';
import Header from './Header';
import Login from './Login'

function App() {
  const [user, setUser] = useState(null)

  // auto login
  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return <Login setUser={setUser}/>

  return (
    <>
      <Header setUser={setUser}/>
      <HomePage setUser={setUser} user={user}/>
    </>
  );
}

export default App;
