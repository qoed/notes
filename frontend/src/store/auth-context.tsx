import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextInterface {
  authenticated: boolean;
  user: User | null;
  setAuthenticated: (val: boolean) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>;
  getMe: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextInterface>({
  authenticated: false,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
  login: async (email, password) => {},
  logout: async () => {},
  deleteUser: async () => {},
  getMe: async () => {},
});

export const AuthContextProvider: React.FC<{}> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const history = useHistory();

  const getMe = useCallback(
    async function () {
      try {
        const { status, data } = await axios.get<{ data: User }>(
          `${process.env.REACT_APP_API_URL}/auth/me`,
          {
            withCredentials: true,
          }
        );
        if (status === 200) {
          setUser({
            name: data.data.name,
            email: data.data.email,
            avatar: data.data.avatar,
          });
          setAuthenticated(true);
        }
      } catch (error) {
        history.push('/auth');
      }
    },
    [history]
  );

  async function login(email: string, password: string) {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      setAuthenticated(true);
      await getMe();
      history.push('/');
    }
  }

  async function logout() {
    const res = await axios.get<{ success: boolean; data: object }>(
      `${process.env.REACT_APP_API_URL}/auth/logout`
    );
    if (res.status === 200) {
      setAuthenticated(false);
      history.push('/auth');
    }
  }

  async function deleteUser() {
    const res = await axios.delete<{ success: boolean; data: object }>(
      `${process.env.REACT_APP_API_URL}/auth/delete`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAuthenticated(false);
      history.push('/auth');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        setUser,
        login,
        logout,
        deleteUser,
        getMe,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
