import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import logo from "../../assets/Logo/mainLogo.svg";
import { FiLogIn } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";

export default function Landing() {
  return (
    <div className={`h-screen ${styles.bg}  `}>
      <div className=" bg-gray-700 bg-opacity-50 h-screen p-10 flex justify-start md:justify-center items-start flex-col">
        <img src={logo} alt="Alquila tu cancha" className="h-20 mb-10" />
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center  bg-gray-900 bg-opacity-60 gap-5">
          <p className="text-2xl md:text-5xl text-white">
            Bienvenido nueva plataforma jugable de nuestra marca.
          </p>
          <p className="text-white text-xs md:text-md">
            Aquí podrás disfrutar de una experiencia única al crear tus equipos
            de jugadores favoritos y competir en partidos emocionantes. Descubre
            las numerosas funciones que ofrecemos, desde personalizar tus
            equipos hasta poder disputar un aprtido entre ambos. ¡Diviértete y
            disfruta de la emoción del deporte en nuestra plataforma!
          </p>

          <Link
            to={"/create"}
            className="inline-bloc bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow self-center mt-6"
          >
            <FaSignInAlt className="inline-block align-middle mr-2" />
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
}
