
import * as yup from "yup";

const phoneRegex = /^(\+998\d{9}|\d{9})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
const discountRegex = /^(100|[1-9]?[0-9])%$/;

export const loginSchema = yup.object().shape(
    {
 phone_number: yup.string()
    .min(18, "Telefon raqam yaroqsiz")
    .required("Telefon raqamingizni kiriting"),
   password: yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/,
      "Parol uzunligi 8 tadan katta  va katta va kichik harflar, ixtiyoriy raqam va bitta belgidan tashkil topgan bo'lishi kerak"
    )
    .required("Parolni kiriting"),
}
)
export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Matn kamida 2 ta belgi bo‘lishi kerak")
    .max(50, "Matn 50 belgidan oshmasligi kerak")
    .required("Matn majburiy"),
  ...loginSchema.fields, 
});

export const discountSchema = yup.object({
  discount: yup
    .string()
    .matches(discountRegex, "Chegirma 0% dan 100% gacha bo‘lishi kerak (masalan: 35%)")
    .required("Chegirma majburiy"),
});
