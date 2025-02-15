import { useState } from "react";
import PropTypes from "prop-types";
// MANY MISTAKES +++++++++++++++++++++
const LogInComponent = ({
  switchToSignIn,
  closeOverlay,
  handleGoogleSignIn,
}) => {
  // getting google sign in from userContext

  const [, setUserLogedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (user) {
      localStorage.setItem("LoggedInUser", JSON.stringify(user));
      alert("Login successful!");
      closeOverlay(); // Close the overlay after login
      setUserLogedIn(true);
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <div className="mx-auto flex flex-col text-center">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
          Log In
        </h2>
        <p className="mb-2.5 mt-2.5 text-zinc-950 dark:text-zinc-400 text-sm">
          Enter your email and password to log in!
        </p>
      </div>

      {/* Google Sign-In Button */}
      <form className="mt-8">
        <button
          className="flex items-center justify-center w-full border border-input bg-background text-zinc-950 py-3 dark:text-white rounded-md hover:bg-black hover:text-white cursor-pointer"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <span className="mr-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              className="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </span>
          <span>Sign in with Google</span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-4 flex items-center py-1">
        <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
      </div>

      {/* Email & Password Form */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-zinc-950 dark:text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={credentials.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:text-white"
            autoComplete="email"
            required
          />

          <label
            className="text-zinc-950 mt-2 dark:text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:text-white"
            autoComplete="current-password"
            required
          />

          <button
            className="btn hover:bg-neutral-600  mt-2 py-2 rounded-lg"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>

      {/* Toggle to Log In */}
      <p className="text-center text-xs mt-5">
        <button
          className="text-zinc-950 dark:text-white hover:underline hover:text-neutral-600"
          onClick={() => {
            // e.stopPropagation(); // Prevents overlay from closing
            switchToSignIn();
          }}
        >
          Do not have an account? Sign in
        </button>
      </p>
    </div>
  );
};

LogInComponent.propTypes = {
  switchToSignIn: PropTypes.func.isRequired,
  closeOverlay: PropTypes.func.isRequired,
  handleGoogleSignIn: PropTypes.func.isRequired,
};

export { LogInComponent };
