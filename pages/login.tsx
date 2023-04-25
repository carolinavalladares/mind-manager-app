import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

interface FormValues {
  email: string;
  password: string;
}

export default function Page() {
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });

  const { signIn } = useAuth();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: FormValues
  ) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      console.log("please enter email and password before submitting...");
      return;
    }

    signIn(values);
  };

  return (
    <div>
      <div className="max-w-lg m-auto bg-white shadow-md p-6">
        <h1 className="text-lg mb-4">Login</h1>
        <form
          onSubmit={(e) => handleSubmit(e, values as FormValues)}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 flex flex-col justify-center">
            <label title="email" className="mb-2" htmlFor="email">
              email:{" "}
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
            <label title="password" className="mb-2" htmlFor="password">
              {" "}
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

          <button
            title="login"
            type="submit"
            className="text-white bg-slate-600 h-10"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { mindManager_token: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
};
