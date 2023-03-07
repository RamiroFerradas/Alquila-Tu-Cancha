import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
      <Link
        to={"/home"}
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Ingresar
      </Link>
    </div>
  );
}
