import * as yup from 'yup'
const PasswordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/; 
export const validateSchema = yup.object().shape({
    Name: yup.string().required("Required"),
    Email: yup.string().email('Please enter a valid email').required("Required"),
    Password: yup.string().min(5).matches(PasswordRules, { message: "please create a stronger password" }).required("Required"),
    ConfirmPassword: yup.string().oneOf([yup.ref("Password"), null], "Password must match").required("Required")
})