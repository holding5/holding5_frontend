import axiosInstace from "./axiosInstance";
import { PaginatedPostsResponse } from "./type/apiType";
import { QueryFunctionContext } from "@tanstack/react-query";
import { NewPostPayload } from "./type/apiType";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { Login } from "./type/apiType";
import { LoginResponse } from "./type/apiType";
export const activeLogin = async (loginInfo: Login): Promise<LoginResponse> => {
  try {
    const response = await axiosInstace.post<LoginResponse>(
      "/api/local/login",
      loginInfo
    );

    return response.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
