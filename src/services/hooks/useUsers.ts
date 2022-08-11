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

interface GetUsersReponse {
  users: User[];
  totalCount: number;
}

//realizando o fetch dos dados dos usuários sem precisar depender do react-query diretamente
export async function getUsers(page: number): Promise<GetUsersReponse> {
  const { data, headers } = await api.get<Data>("users", {
    params: {
      page,
    }
  });

  const totalCount = Number(headers["x-total-count"]);

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

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
  });
}