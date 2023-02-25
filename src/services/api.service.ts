import axios from "axios";
import {
  ApiResponseType,
  CreateNoteType,
  CreateUserType,
  DeleteNoteType,
  LoginUserType,
  UpdateNoteType,
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
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const loginUser = async (
  login: LoginUserType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post(
      "/user/login",
      login
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listNotes = async (
  userId: any
): Promise<ApiResponseType> => {
  try {
    const result = await api.get(
      `user/${userId}/notes`
    );

    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const createNote = async (
  data: CreateNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post(
      `user/${data.userId}/notes`,
      data
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const deleteNote = async (
  path: DeleteNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.delete(
      `user/${path.userId}/notes/${path.noteId}`
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const updateNote = async (
  data: UpdateNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.put(
      `user/${data.userId}/notes/${data.noteId}`,
      data
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};
