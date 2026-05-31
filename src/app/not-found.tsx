import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FBF5F0] via-[#F5E8E8] to-[#EFE0EC] flex flex-col items-center justify-center px-5 text-center">
      <div className="text-6xl mb-6">💔</div>
      <h1 className="font-cormorant font-light italic text-[52px] text-ink mb-3 leading-tight">
        Letter not found
      </h1>
      <p className="text-muted text-[15px] font-light mb-10">
        The code might be wrong, or this letter no longer exists.
      </p>
      <Link
        href="/open"
        className="bg-rose text-white px-8 py-4 rounded-full text-[15px] shadow-[0_8px_24px_rgba(201,80,90,0.35)] hover:bg-rose-dark transition-all"
      >
        Try again
      </Link>
    </main>
  );
}
