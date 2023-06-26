import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
interface FormValues {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { signIn } = useAuth();

  const submit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (!data.email || !data.password) {
      console.log("please enter email and password before submitting...");
      return;
    }

    signIn(data);
  };

  return (
    <div>
      <div className="max-w-lg m-auto bg-white shadow-md p-6">
        <h1 className="text-lg mb-4">Login</h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 flex flex-col justify-center relative">
            <label title="email" className="mb-2 text-sm" htmlFor="email">
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
            <label title="password" className="mb-2 text-sm" htmlFor="password">
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

          <button
            title="login"
            type="submit"
            className="text-white bg-slate-800 h-10 mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-4 font-light">
          No account yet?{" "}
          <Link className="text-slate-800 hover:underline" href={"/register"}>
            Register
          </Link>
        </p>
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
