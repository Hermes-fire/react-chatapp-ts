import { useState } from "react";
import { Link } from "react-router-dom";
import { ValuesType } from "../../utils/types";

import { LoginContainerWrapper } from "./LoginContainerWrapper";

const LoginContainer = () => {
  const intialValues: ValuesType = { email: "", password: "" };
  const [formValues, setFormValues] = useState<ValuesType>(intialValues);
  const [formErrors, setFormErrors] = useState<ValuesType>({
    email: "",
    password: "",
  });

  //   HandleClick Function
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //   onClick Function
  const onClick = (e: any) => {
    //  to stop loading the page
    e.preventDefault();
    setFormErrors(validateForm(formValues));
  };

  // UseEffect to submit the form
  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log("submit");

  //   }
  // }, [formErrors]);

  //   ValidateForm Function
  const validateForm = (values: ValuesType) => {
    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!!!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 5 characters";
    }

    return errors;
  };

  return (
    <LoginContainerWrapper className="LoginContainer">
      <h3>SIGN IN</h3>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className="errors">{formErrors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors.password && <p className="errors">{formErrors.password}</p>}
      </form>
      <button onClick={onClick}>LOGIN</button>
      <a>DO NOT YOU REMEMBER THE PASSWORD?</a>
      <Link to="/register">CREATE A NEW ACCOUNT</Link>
    </LoginContainerWrapper>
  );
};

export default LoginContainer;
