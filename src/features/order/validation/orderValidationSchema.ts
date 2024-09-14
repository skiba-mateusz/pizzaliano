import * as yup from "yup";

export const OrderFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Invalid name")
    .min(3, "Full name needs to be at least 3 characters long")
    .max(50, "Full name cannot exceed 50 characters"),

  emailAddress: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/, "Invalid phone number")
    .required("Phone number is required"),

  streetAddress: yup
    .string()
    .required("Street address is required")
    .min(5, "Street address needs to be at least 5 characters long"),

  city: yup
    .string()
    .required("City is required")
    .min(3, "City name needs to be at least 3 characters long"),

  postalCode: yup.string().required("Postal code is required"),
});
