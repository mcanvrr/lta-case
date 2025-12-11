import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  email: z.email("Geçerli bir e-posta adresi giriniz"),
  phone: z
    .string()
    .regex(
      /^5\d{9}$/,
      "Lütfen geçerli bir telefon numarası giriniz (Örn: 5XX ...)"
    ),
  companyName: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır"),
});

export type UserFormValues = z.infer<typeof userSchema>;
