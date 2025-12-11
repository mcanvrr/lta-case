import api from "@/lib/axios";
import {
  addUser,
  deleteUser,
  setUsers,
  updateUser,
} from "@/lib/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Üyeleri Getir
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

// Üye Ekle
const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", user);
  return data;
};

// Üye Düzenle
const editUser = async (user: User): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return user;
};

// Üye Sil
const removeUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const useUserQueries = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (usersQuery.data && users.length === 0) {
      dispatch(setUsers(usersQuery.data));
    }
  }, [usersQuery.data, dispatch, users.length]);

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      const userWithUniqueId = { ...newUser, id: Date.now() };
      dispatch(addUser(userWithUniqueId));
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: (updatedUser) => {
      dispatch(updateUser(updatedUser));
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: removeUser,
    onSuccess: (_, id) => {
      dispatch(deleteUser(id));
    },
  });

  return {
    users: users,
    isLoading: usersQuery.isLoading && users.length === 0,
    isError: usersQuery.isError,
    error: usersQuery.error,
    addUser: addUserMutation.mutate,
    isAdding: addUserMutation.isPending,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};
