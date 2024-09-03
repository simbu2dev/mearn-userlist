// App.js
import { Routes, Route } from 'react-router-dom';
import UserContextProvider from './contexts/User/UserState';
import Users from './components/User/Users';
import ManageUser from './components/User/ManageUser';
import UserDetails from './components/User/UserDetails';
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<UserContextProvider><Users /></UserContextProvider>} />
            <Route path="/users/add" element={<UserContextProvider><ManageUser /></UserContextProvider>} />
            <Route path="/users/:userId" element={<UserContextProvider><UserDetails /></UserContextProvider>} />
            <Route path="/users/:userId/edit" element={<UserContextProvider><ManageUser /></UserContextProvider>} />
         </Routes>
      </>
   );
};
 
export default App;