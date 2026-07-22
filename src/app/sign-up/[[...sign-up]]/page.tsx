import { SignUp } from "@clerk/nextjs";
import { HeartIcon } from "@/app/_components/Icons";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FBF5F0] via-[#F5E8E8] to-[#EFE0EC] flex flex-col items-center justify-center px-5">
      <div className="mb-8 text-center">
        <span className="font-cormorant text-[28px] italic text-rose">
          amare <HeartIcon className="mb-0.5 inline-block h-4 w-4" />
        </span>
        <p className="text-[13px] text-muted mt-1 font-light">
          create your account
        </p>
      </div>
      <SignUp />
    </main>
  );
}
