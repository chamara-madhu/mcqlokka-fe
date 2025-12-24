import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/buttons/Button";
import { isValidEmail } from "../../../utils/general";
import authService from "../../../services/auth.service";
import FormInput from "../../shared/fields/FormInput";
import { ADMIN_DASHBOARD_PATH } from "../../../constants/routes";
import Logo from "../../../assets/images/logo.png";
import { ArrowLeft } from "feather-icons-react";
import OtpInput from "../../shared/fields/OtpInput";

const initialState = {
  name: "",
  email: "",
  otp: "",
  nameErr: "",
  emailErr: "",
  otpErr: "",
};

const SignUpLoginMain = () => {
  const [showSignUpView, setShowSignUpView] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const { login, signUp, verifyOtp } = authService();

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

  const handleOTPChange = (value) => {
    setForm((prev) => ({ ...prev, otp: value, otpErr: "" }));
  };

  const validateLogin = () => {
    let emailErr = "";

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    if (emailErr) {
      setForm((prevForm) => ({
        ...prevForm,
        emailErr,
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
      };

      try {
        await login(data);
        setShowOtpView(true);
        setLoading(false);
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

    if (!form.name) {
      nameErr = "Name is required";
    }

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    if (nameErr || emailErr) {
      setForm((prevForm) => ({
        ...prevForm,
        nameErr,
        emailErr,
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
      };

      try {
        const res = await signUp(data);

        setShowOtpView(true);
        setLoading(false);
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

  const validateOtp = () => {
    let otpErr = "";

    if (!form.otp) {
      otpErr = "OTP is required";
    }

    if (otpErr) {
      setForm((prevForm) => ({
        ...prevForm,
        otpErr,
      }));

      return false;
    }

    return true;
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    if (!validateOtp()) return;

    setLoading(true);

    const data = {
      email: form.email,
      otp: form.otp,
    };

    try {
      const res = await verifyOtp(data);

      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user_data", JSON.stringify(res.data.user));

      if (res.data.user.role === 0) {
        navigate(ADMIN_DASHBOARD_PATH);
      } else {
        navigate(-1);
      }
    } catch (err) {
      if (err?.response?.data?.code === 1100) {
        setForm((prevForm) => ({
          ...prevForm,
          otpErr: err.response.data.message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowOtpView(false);
    setForm((prevForm) => ({
      ...prevForm,
      otp: "",
      otpErr: "",
    }));
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
            className="flex items-center gap-1 text-xs cursor-pointer hover:text-purple-600 w-fit"
          >
            <ArrowLeft size="16" /> Go back
          </Link>
          <img src={Logo} alt="main bg" className="w-[200px]" />
        </div>
      </div>
      <div className="flex w-full sm:w-2/3 md:w-1/2 h-[100vh] items-center justify-center">
        <div className="flex flex-col w-full sm:w-[320] max-w-[320px]">
          <p className="mt-2 mb-10 text-4xl font-bold">
            {showSignUpView ? "Sign Up" : "Login"}
          </p>

          {!showOtpView ? (
            <form
              className="flex flex-col gap-6"
              onSubmit={showSignUpView ? handleSignUp : handleLogin}
            >
              {showSignUpView && (
                <FormInput
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={form.nameErr}
                  // info="* This name will apply your certificate."
                />
              )}
              <FormInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={form.emailErr}
                info="An OTP will be sent to you"
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
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleOTP}>
              <p className="text-sm text-gray-600">
                An OTP has been sent to{" "}
                <span className="font-medium text-gray-800">{form.email}</span>
              </p>
              <OtpInput
                value={form.otp}
                onChange={handleOTPChange}
                error={form.otpErr}
              />
              <div>
                <Button
                  label="Verify OTP"
                  type="submit"
                  variant="dark"
                  className="w-full"
                  isLoading={loading}
                  loadingLabel="Verifying"
                />
                <p
                  className="mt-2 text-sm font-medium text-center cursor-pointer"
                  onClick={handleBack}
                >
                  Go back
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginMain;
