import { useState, createContext } from "react";

const UserContext = createContext({ name: '', auth: false });
// This also works: const UserContext = createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', auth: false });
  
    // Login updates the user data with a name parameter
    const login = (email, token) => {
      setUser(() => ({
        email: email,
        auth: true,
      }));
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
    };
  
    // Logout updates the user data to default
    const logout = () => {
      setUser(() => ({
        email: '',
        auth: false,
      }));
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
}

export { UserContext, UserProvider}