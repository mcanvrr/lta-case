"use client";

import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserQueries } from "@/hooks/useUserQueries";
import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";

const LoadingSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  </div>
);

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const userId = parseInt(resolvedParams.id);

  const { users, isLoading, updateUser, isUpdating } = useUserQueries();

  const currentUser = users.find((u) => u.id === userId);

  if (!isLoading && users.length > 0 && !currentUser) {
    toast.error("Üye bulunamadı");
    router.back();
    return null;
  }

  const handleUpdateUser = (data: Omit<User, "id">) => {
    if (!currentUser) return;

    updateUser(
      { ...currentUser, ...data },
      {
        onSuccess: () => {
          toast.success("Bilgiler başarıyla güncellendi");
          router.back();
        },
        onError: () => {
          toast.error("Güncelleme sırasında bir hata oluştu");
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-(family-name:--font-geist-sans)">
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
              Üye Bilgileri
            </h1>
            <p className="text-slate-500 text-sm">
              Üye bilgilerini görüntüleyin ve düzenleyin.
            </p>
          </div>
        </div>

        {isLoading || !currentUser ? (
          <LoadingSkeleton />
        ) : (
          <UserForm
            key={currentUser.id}
            buttonText="Bilgileri Güncelle"
            initialData={currentUser}
            onSubmit={handleUpdateUser}
            isLoading={isUpdating}
          />
        )}
      </div>
    </main>
  );
}
