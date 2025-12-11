import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function UserHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Kullanıcı Yönetimi
        </h1>
      </div>
      <Link href="/new">
        <Button className="font-medium shadow-sm h-10 px-4">
          <Plus className="mr-2 h-4 w-4" /> Üye Ekle
        </Button>
      </Link>
    </div>
  );
}
