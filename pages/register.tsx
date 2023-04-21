import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export default function Page() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: FormValues
  ) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      console.log("please enter all required data before submitting...");
      return;
    }

    if (values.password !== values.confirmPassword) {
      console.log("Passwords do not match...");
      return;
    }

    console.log(values);
  };

  return (
    <div>
      <div className="max-w-lg m-auto bg-white shadow-md p-6">
        <h1 className="text-lg mb-4">Register</h1>
        <form
          onSubmit={(e) => handleSubmit(e, values as FormValues)}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 flex flex-col justify-center">
            <label title="email" className="mb-2" htmlFor="email">
              email:
            </label>
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="border h-10 px-4 focus:border-slate-600 focus:outline-none"
              id="email"
              name="email"
              type="text"
            />
          </div>

          <div className="mb-4 flex flex-col justify-center">
            <label title="email" className="mb-2" htmlFor="username">
              username:
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              className="border h-10 px-4 focus:border-slate-600 focus:outline-none"
              id="username"
              name="username"
              type="text"
            />
          </div>

          <div className="mb-4 flex flex-col justify-center">
            <label title="password" className="mb-2" htmlFor="password">
              password:
            </label>

            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="border h-10 px-4 focus:border-slate-600 focus:outline-none"
              id="password"
              name="password"
              type="password"
            />
          </div>

          <div className="mb-4 flex flex-col justify-center">
            <label title="password" className="mb-2" htmlFor="confirm_password">
              confirm password:
            </label>

            <input
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
              className="border h-10 px-4 focus:border-slate-600 focus:outline-none"
              id="confirm_password"
              name="confirm_password"
              type="password"
            />
          </div>

          <button
            title="login"
            type="submit"
            className="text-white bg-slate-600 h-10"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
