import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../core/data/api';
import { useAppDispatch } from '../core/data/redux/store';
import { logout } from '../feature-module/router/authSlice';
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  checkAuth: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Optional: Verify token structure before making API call
    // if (!isValidToken(token)) {
    //   localStorage.removeItem('token');
    //   setIsAuthenticated(false);
    //   setIsLoading(false);
    //   return;
    // }

    // Set auth true temporarily while we verify with the server
    setIsAuthenticated(true);
    
    // try {
    //   // Verify token with server (optional - can remove if you want pure client-side check)
    //   await api.get('/auth/verify', {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   setIsAuthenticated(true);
    // } catch (error) {
    //   localStorage.removeItem('token');
    //   setIsAuthenticated(false);
    //   dispatch(logout());
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Simple token validation (check structure only)
  const isValidToken = (token: string): boolean => {
    // Very basic check - adjust according to your token format
    return token.split('.').length === 3;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import api from '../core/data/api';
// import { useAppDispatch } from '../core/data/redux/store';
// import { logout } from '../feature-module/router/authSlice';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   isAuthenticated: false,
//   isLoading: true,
//   checkAuth: async () => {},
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useAppDispatch();

//   const checkAuth = async () => {
//     setIsLoading(true);
//     console.log("checkAuth");
//     try {
//       await api.get('/auth/verify'); // Your auth verification endpoint
//       setIsAuthenticated(true);
//     } catch (error) {
//       setIsAuthenticated(false);
//       dispatch(logout()); // Clear any existing auth state
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("checkAuth");
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);