import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuth } from "../../context/LoginContext";
import { activeLogin } from "../../api/Login";
import { LoginResponse, Login } from "../../api/type/apiType";
import { Alert } from "react-native";

export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  Login
> => {
  const { login } = useAuth();

  return useMutation<LoginResponse, Error, Login>({
    mutationFn: activeLogin,
    onSuccess: (data) => {
      if (data.token) {
        login(data.token);
      }
    },
    onError: (error) => {
      Alert.alert("로그인 실패", error.message);
    },
  });
};
