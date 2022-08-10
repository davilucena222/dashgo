import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;  
}

interface Data {
  users: User[];
}

//realizando o fetch dos dados dos usuários sem precisar depender do react-query diretamente
export async function getUser(): Promise<User[]> {
  const { data } = await api.get<Data>("users");

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery(["users"], getUser, {
    staleTime: 1000 * 5,
  });
}