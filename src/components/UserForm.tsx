"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserFormValues, userSchema } from "@/lib/validations/user";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      username: initialData?.username || "",
      phone: initialData?.phone || "",
      companyName: initialData?.company?.name || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      trigger();
    }
  }, [trigger, initialData]);

  const onSubmitForm = (data: UserFormValues) => {
    const userPayload: Omit<User, "id"> = {
      name: data.name,
      email: data.email,
      username: data.username,
      phone: data.phone,
      website: initialData?.website || "example.com",
      address: initialData?.address || {
        street: "Main St",
        suite: "Apt 1",
        city: "Anytown",
        zipcode: "12345",
        geo: { lat: "0", lng: "0" },
      },
      company: {
        name: data.companyName,
        catchPhrase: initialData?.company?.catchPhrase || "Default Catchphrase",
        bs: initialData?.company?.bs || "Default BS",
      },
    };

    onSubmit(userPayload);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Ad Soyad
            </label>
            <Input
              {...register("name")}
              placeholder="Ad Soyad Giriniz"
              className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400 ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Kullanıcı Adı
            </label>
            <Input
              {...register("username")}
              placeholder="Kullanıcı Adı Giriniz"
              className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400 ${
                errors.username ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              E-posta Adresi
            </label>
            <Input
              {...register("email")}
              placeholder="E-posta Adresi Giriniz"
              type="email"
              className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400 ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Telefon Numarası
            </label>
            <Input
              {...register("phone")}
              placeholder="Telefon Numarası Giriniz"
              className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400 ${
                errors.phone ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Şirket Adı
          </label>
          <Input
            {...register("companyName")}
            placeholder="Şirket Adı Giriniz"
            className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-400 ${
              errors.companyName ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
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
            disabled={isLoading || !isValid}
            className="flex-1 bg-black hover:bg-slate-800 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Kaydediliyor..." : buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
