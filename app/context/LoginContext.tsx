import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async (token: string) => {
        setUserToken(token);
        await SecureStore.setItemAsync("userToken", token);
      },
      logout: async () => {
        setUserToken(null);
        await SecureStore.deleteItemAsync("userToken");
      },
    }),
    []
  );

  const value: AuthContextType = {
    userToken,
    isLoading,
    login: authContext.login,
    logout: authContext.logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
};
