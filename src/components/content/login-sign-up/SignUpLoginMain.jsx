import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/buttons/Button";
import { isValidEmail } from "../../../utils/general";
import authService from "../../../services/auth.service";
import FormInput from "../../shared/fields/FormInput";
import { ADMIN_DASHBOARD_PATH } from "../../../constants/routes";
import Logo from "../../../assets/images/logo.png";

const SignUpLoginMain = ({ isSignUp }) => {
  const [showSignUpView, setShowSignUpView] = useState(isSignUp);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const { login, signUp } = authService();

  useEffect(() => {
    if (showSignUpView) {
      if (!nameRef.current) return;
      nameRef.current.focus();
    } else {
      if (!emailRef.current) return;
      emailRef.current.focus();
    }
  }, [showSignUpView]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  }, []);

  const validateLogin = () => {
    let emailErr = "";
    let passwordErr = "";

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    if (!form.password) {
      passwordErr = "Password is required";
    }

    if (emailErr || passwordErr) {
      setForm((prevForm) => ({
        ...prevForm,
        emailErr,
        passwordErr,
      }));

      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      setLoading(true);

      const data = {
        email: form.email,
        password: form.password,
      };

      try {
        const res = await login(data);
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("user_data", JSON.stringify(res.data.user));
        setLoading(false);
        if (res.data.user.role === 0) {
          navigate(ADMIN_DASHBOARD_PATH);
        } else {
          navigate(-1);
        }
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateInSignUp = () => {
    let nameErr = "";
    let emailErr = "";
    let passwordErr = "";

    if (!form.name) {
      nameErr = "First name is required";
    }

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!form.password) {
      passwordErr = "Password is required.";
    } else if (form.password.length < 8) {
      passwordErr = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(form.password)) {
      passwordErr = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(form.password)) {
      passwordErr = "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(form.password)) {
      passwordErr = "Password must contain at least one digit.";
    } else if (!/[!@#$%^&*]/.test(form.password)) {
      passwordErr =
        "Password must contain at least one special character (e.g., !@#$%^&*).";
    } else if (!passwordRegex.test(form.password)) {
      passwordErr = "Password does not meet the required criteria.";
    }

    if (nameErr || emailErr || passwordErr) {
      setForm((prevForm) => ({
        ...prevForm,
        nameErr,
        emailErr,
        passwordErr,
      }));

      return false;
    }

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateInSignUp()) {
      setLoading(true);

      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
      };

      try {
        const res = await signUp(data);

        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("user_data", JSON.stringify(res.data.user));
        setLoading(false);
        if (res.data.user.role === 0) {
          navigate(ADMIN_DASHBOARD_PATH);
        } else {
          navigate(-1);
        }
      } catch (err) {
        setForm((prev) => ({
          ...prev,
          emailErr:
            err.response?.data?.message || "An unexpected error occurred.",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="flex flex-col w-full h-full sm:flex-row"
      data-testid="signup-login-main"
    >
      <div className="hidden sm:flex w-1/3 md:w-1/2 h-[100vh] items-center justify-center bg-purple-100">
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="text-xs cursor-pointer hover:font-medium w-fit"
          >
            Go back
          </Link>
          <img src={Logo} alt="main bg" className="w-[200px]" />
        </div>
      </div>
      <div className="flex w-full sm:w-2/3 md:w-1/2 h-[100vh] items-center justify-center">
        <div className="flex flex-col w-full sm:w-[320] max-w-[320px]">
          {showSignUpView && <p className="text-2xl">Student Registration</p>}
          <p className="mt-2 mb-10 text-4xl font-bold">Online ICT</p>

          <form
            className="flex flex-col gap-6"
            onSubmit={showSignUpView ? handleSignUp : handleLogin}
          >
            {showSignUpView && (
              <FormInput
                label="Full name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={form.nameErr}
                info="* This name will apply your certificate."
              />
            )}
            <FormInput
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={form.emailErr}
            />
            <FormInput
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={form.passwordErr}
            />
            <p className="text-sm text-red-400">{error}</p>
            <div>
              <Button
                label={showSignUpView ? "Sign up" : "Login"}
                type="submit"
                variant="dark"
                className="w-full"
                isLoading={loading}
              />
              {showSignUpView ? (
                <p className="mt-2 text-sm font-medium text-center">
                  Do you have an account?{" "}
                  <span
                    className="text-purple-600 cursor-pointer"
                    onClick={() => {
                      setShowSignUpView(false);
                      setForm((prevForm) => ({
                        ...prevForm,
                        emailErr: "",
                        nameErr: "",
                        lNameErr: "",
                      }));
                    }}
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p className="mt-2 text-sm font-medium text-center">
                  Don&apos;t you have an account?{" "}
                  <span
                    className="text-purple-600 cursor-pointer"
                    onClick={() => {
                      setShowSignUpView(true);
                      setForm((prevForm) => ({
                        ...prevForm,
                        emailErr: "",
                      }));
                    }}
                  >
                    Sign up free
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginMain;
