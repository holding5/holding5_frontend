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
  userId: number | null;
  isLoading: boolean;
  login: (session: { token: string; userId: number }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     const token = await SecureStore.getItemAsync("userToken");
  //     setUserToken(token);
  //     setIsLoading(false);
  //   };
  //   bootstrapAsync();
  // }, []);

  const authContext = useMemo(
    () => ({
      login: async (session: { token: string; userId: number }) => {
        setUserToken(session.token);
        setUserId(session.userId);
        await SecureStore.setItemAsync("userToken", session.token);
        await SecureStore.setItemAsync("userId", String(session.userId));
      },
      logout: async () => {
        setUserToken(null);
        setUserId(null);

        await SecureStore.deleteItemAsync("userToken");
        await SecureStore.deleteItemAsync("userId");
      },
    }),
    []
  );

  const value: AuthContextType = {
    userToken,
    userId,
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
