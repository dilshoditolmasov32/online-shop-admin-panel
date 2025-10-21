import * as yup from "yup";

const phoneRegex = /^(\+998\d{9}|\d{9})$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;

const discountRegex = /^(100|[1-9]?[0-9])%$/;

export const schema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegex, "Telefon raqam noto‘g‘ri (masalan: +998901234567)")
    .required("Telefon raqam majburiy"),
  
  name: yup
    .string()
    .min(2, "Matn kamida 2 ta belgi bo‘lishi kerak")
    .max(50, "Matn 50 belgidan oshmasligi kerak")
    .required("Matn majburiy"),
  
  password: yup
    .string()
    .matches(passwordRegex, "Parol kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqamdan iborat bo‘lishi kerak")
    .min(5, "Parol kamida 5 belgidan iborat bo‘lishi kerak")
    .required("Parol majburiy"),
  
  discount: yup
    .string()
    .matches(discountRegex, "Chegirma 0% dan 100% gacha bo‘lishi kerak (masalan: 35%)")
    .required("Chegirma majburiy"),
});
