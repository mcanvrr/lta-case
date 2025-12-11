"use client";

import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";
import { UserHeader } from "@/components/users/UserHeader";
import { UserPagination } from "@/components/users/UserPagination";
import { UserTable } from "@/components/users/UserTable";
import { UserToolbar } from "@/components/users/UserToolbar";
import { useUserQueries } from "@/hooks/useUserQueries";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { users, isLoading, isError, error, deleteUser, isDeleting } =
    useUserQueries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const itemsPerPage = 6;

  const uniqueCompanies = Array.from(
    new Set(users.map((u) => u.company?.name).filter(Boolean))
  ).sort();

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-destructive">
        <div className="p-4 rounded-lg bg-white shadow-sm border border-destructive/20">
          Hata: {error?.message}
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany =
      selectedCompanies.length === 0 ||
      (user.company?.name && selectedCompanies.includes(user.company.name));

    return matchesSearch && matchesCompany;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Avatar İsim Gösterimi (John Doe => JD)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete, {
        onSuccess: () => {
          toast.success("Kullanıcı başarıyla silindi");
          setUserToDelete(null);
        },
        onError: () => {
          toast.error("Kullanıcı silinirken hata oluştu");
        },
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-(family-name:--font-geist-sans)">
      <div className="max-w-7xl mx-auto space-y-6">
        <UserHeader />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <UserToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            uniqueCompanies={uniqueCompanies}
            filteredUsersCount={filteredUsers.length}
            setCurrentPage={setCurrentPage}
          />

          <UserTable
            isLoading={isLoading}
            filteredUsers={filteredUsers}
            paginatedUsers={paginatedUsers}
            getInitials={getInitials}
            setUserToDelete={setUserToDelete}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            totalUsers={filteredUsers.length}
          />
        </div>
      </div>

      <DeleteUserDialog
        open={!!userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </main>
  );
}
