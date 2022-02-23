import './index.css';
import React, {  } from 'react'
import HomePage from './HomePage';
import Header from './Header';
// import LoginModal from './LoginModal'

function App() {
  // const [user, setUser] = useState(null)

  // // useEffect(() => {
  // //   fetch('/me').then((r) => {
  // //     if (r.ok) {
  // //       r.json().then((user) => setUser(user))
  // //     }
  // //   })
  // // }, [])

  // if (!user) return <LoginModal setUser={setUser}/>
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;
