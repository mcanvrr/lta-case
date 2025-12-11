"use client";

import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import { useUserQueries } from "@/hooks/useUserQueries";
import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewUserPage() {
  const { addUser, isAdding } = useUserQueries();
  const router = useRouter();

  const handleAddUser = (userData: Omit<User, "id">) => {
    addUser(userData, {
      onSuccess: () => {
        toast.success("Kullanıcı başarıyla oluşturuldu");
        router.push("/");
      },
      onError: () => {
        toast.error("Kullanıcı oluşturulurken bir hata oluştu");
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Yeni Üye Ekle
            </h1>
            <p className="text-slate-500 text-sm">Yeni bir üye oluşturun.</p>
          </div>
        </div>

        <UserForm
          buttonText="Üye Ekle"
          isLoading={isAdding}
          onSubmit={handleAddUser}
        />
      </div>
    </main>
  );
}
