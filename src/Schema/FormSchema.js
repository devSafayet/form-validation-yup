import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string("email should be a string")
    .email("please provide a valid email address")
    .required("email address is required"),
    password: yup
    .string("password should be a string")
    .min(5, "password should have a minimum length of 5")
    .max(12, "password should have a maximum length of 12")
    .required("password is required"),
  confirmPassword: yup
    .string("password should be a string")
    .oneOf([yup.ref("password")])
    .required("confirm password is required"),
    country: yup
    .string("please select a country")
    .oneOf(["bd", "aus", "usa", "us"])
    .required("account type is required"),
  remember: yup.boolean().oneOf([true], "Please tick checkbox"),
  accepts: yup.boolean().oneOf([true], "Please toggle accept"),
});