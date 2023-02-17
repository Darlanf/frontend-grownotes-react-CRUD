import axios from "axios";
import {
  ApiResponseType,
  CreateUserType,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createUser = async (
  user: CreateUserType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post("/user", user);
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      console.log(error.request.response);
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};
