import Header from "./Header";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function Layout({ children }: Props) {
  return (
    <div className="font-poppins ">
      <Header />

      <div className="max-w-screen-lg m-auto mt-4 px-4 min-h-[600px]">
        {children}
      </div>
    </div>
  );
}
