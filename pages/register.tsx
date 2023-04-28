import { GetServerSideProps } from "next";
import useAuth from "@/hooks/useAuth";
import { parseCookies } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { signUp } = useAuth();

  const submit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match...");
      return toast.error("passwords have to match...");
    }

    const user = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    signUp(user);

    console.log(data);
  };

  return (
    <div>
      <div className="max-w-lg m-auto bg-white shadow-md p-6">
        <h1 className="text-lg mb-4">Register</h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 flex flex-col justify-center relative">
            <label title="email" className="mb-2" htmlFor="email">
              email:
            </label>
            <input
              {...register("email", { required: true })}
              className={`border h-10 px-4 focus:border-slate-600 focus:outline-none ${
                errors.email && "border-rose-600"
              }`}
              id="email"
              name="email"
              type="email"
            />

            {errors.email && (
              <p className="text-xs text-rose-600 absolute top-full">
                email is required
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col justify-center relative">
            <label title="email" className="mb-2" htmlFor="username">
              username:
            </label>
            <input
              {...register("username", { required: true })}
              className={`border h-10 px-4 focus:border-slate-600 focus:outline-none ${
                errors.username && "border-rose-600"
              }`}
              id="username"
              name="username"
              type="text"
            />

            {errors.username && (
              <p className="text-xs text-rose-600 absolute top-full">
                username is required
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col justify-center relative">
            <label title="password" className="mb-2" htmlFor="password">
              password:
            </label>

            <input
              {...register("password", { required: true })}
              className={`border h-10 px-4 focus:border-slate-600 focus:outline-none ${
                errors.password && "border-rose-600"
              }`}
              id="password"
              name="password"
              type="password"
            />

            {errors.password && (
              <p className="text-xs text-rose-600 absolute top-full">
                password is required
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col justify-center relative">
            <label title="password" className="mb-2" htmlFor="confirm_password">
              confirm password:
            </label>

            <input
              {...register("confirmPassword", { required: true })}
              className={`border h-10 px-4 focus:border-slate-600 focus:outline-none ${
                errors.confirmPassword && "border-rose-600"
              }`}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            {errors.confirmPassword && (
              <p className="text-xs text-rose-600 absolute top-full">
                confirm password is required
              </p>
            )}
          </div>

          <button
            title="login"
            type="submit"
            className="text-white bg-slate-600 h-10 mt-2"
          >
            Register
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
