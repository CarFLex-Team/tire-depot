import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark p-4">
        <h1 className="mb-4 text-center text-4xl font-bold text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="text-center text-gray-400">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Footer />
    </>
  );
}
