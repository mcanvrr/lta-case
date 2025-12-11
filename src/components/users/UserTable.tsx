import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import {
  MoreHorizontal,
  Trash,
  UserPen,
  Users as UsersIcon,
} from "lucide-react";
import Link from "next/link";

interface UserTableProps {
  isLoading: boolean;
  filteredUsers: User[];
  paginatedUsers: User[];
  getInitials: (name: string) => string;
  setUserToDelete: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function UserTable({
  isLoading,
  filteredUsers,
  paginatedUsers,
  getInitials,
  setUserToDelete,
  searchQuery,
  setSearchQuery,
}: UserTableProps) {
  return (
    <div className="relative text-sm">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[320px] pl-6 h-12 text-slate-600 font-semibold">
              Üye Bilgileri
            </TableHead>
            <TableHead className="h-12 text-slate-600 font-semibold">
              İletişim Bilgileri
            </TableHead>
            <TableHead className="h-12 text-slate-600 font-semibold">
              Şirket Bilgisi
            </TableHead>
            <TableHead className="text-right pr-6 h-12 text-slate-600 font-semibold">
              İşlemler
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="border-slate-50">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[140px]" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px] rounded-full" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-8 w-8 ml-auto rounded-md" />
                </TableCell>
              </TableRow>
            ))
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-96 text-center text-slate-500"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
                    <UsersIcon className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mt-2">
                    Sonuç bulunamadı
                  </h3>
                  <p className="text-slate-500 max-w-sm">
                    {searchQuery
                      ? `"${searchQuery}" ile eşleşen üye bulunamadı.`
                      : "Henüz hiç üye yok."}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="mt-4"
                    >
                      Filtreleri Temizle
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="group hover:bg-slate-50/50 border-slate-100 transition-colors"
              >
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-slate-200 bg-white">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 leading-tight">
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-700">{user.email}</span>
                    <span className="text-xs text-slate-400">{user.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 px-2.5 py-0.5"
                  >
                    {user.company?.name || "Şirket Bilgisi Yok"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900 opacity-60 group-hover:opacity-100 bg-transparent hover:bg-slate-100"
                      >
                        <span className="sr-only">Menüyü aç</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                      <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                      <Link href={`/users/${user.id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserPen className="mr-2 h-4 w-4 text-slate-500" />
                          Üyeyi Düzenle
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="focus:bg-red-50 focus:text-red-700 text-slate-600 cursor-pointer"
                        onClick={() => setUserToDelete(user.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Üyeyi Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
