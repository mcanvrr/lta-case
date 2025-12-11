"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Omit<User, "id">) => void;
  isLoading?: boolean;
  buttonText: string;
}

export default function UserForm({
  initialData,
  onSubmit,
  isLoading = false,
  buttonText,
}: UserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    username: initialData?.username || "",
    phone: initialData?.phone || "",
    companyName: initialData?.company?.name || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userPayload: Omit<User, "id"> = {
      name: formData.name,
      email: formData.email,
      username:
        formData.username || formData.name.toLowerCase().replace(/\s/g, ""),
      phone: formData.phone,
      website: initialData?.website || "example.com",
      address: initialData?.address || {
        street: "Main St",
        suite: "Apt 1",
        city: "Anytown",
        zipcode: "12345",
        geo: { lat: "0", lng: "0" },
      },
      company: {
        name: formData.companyName,
        catchPhrase: initialData?.company?.catchPhrase || "Default Catchphrase",
        bs: initialData?.company?.bs || "Default BS",
      },
    };

    onSubmit(userPayload);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Ad Soyad
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ad Soyad Giriniz"
              required
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Kullanıcı Adı
            </label>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Kullanıcı Adı Giriniz"
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              E-posta Adresi
            </label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="E-posta Adresi Giriniz"
              type="email"
              required
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Telefon Numarası
            </label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Telefon Numarası Giriniz"
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Şirket Adı
          </label>
          <Input
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Şirket Adı Giriniz"
            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 text-slate-600 border-slate-300 hover:bg-slate-50"
          >
            İptal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-black hover:bg-slate-800 text-white"
          >
            {isLoading ? "Kayıt Ediliyor..." : buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
