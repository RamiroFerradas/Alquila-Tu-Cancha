import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { useTeams } from "../../Hooks/useTeams";
import logo from "../../assets/Logo/mainLogo.svg";

export default function Navmenu() {
  const [openNav, setOpenNav] = useState(false);
  const { team1, team2 } = useTeams();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const { pathname } = useLocation();

  const DisabledNavLink = ({ to, disabled, ...props }) => {
    if (disabled) {
      return (
        <span {...props} className="text-gray-400 cursor-not-allowed">
          {props.children}
        </span>
      );
    }
    return <NavLink {...props} to={to} />;
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-norma ${pathname === "/create" && `text-red-800`}`}
      >
        <NavLink to={"/create"} className="flex items-center">
          {`${
            !team1.players || !team2.players
              ? `Crear equipo`
              : `Agregar Jugadores`
          }`}
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-norma ${pathname === "/teams" && `text-red-800`}`}
      >
        <DisabledNavLink
          disabled={!team1.name || !team2.name}
          to={"/teams"}
          className="flex items-center"
        >
          Mis equipos
        </DisabledNavLink>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-2 fixed top-0 right-0 left-0 z-10">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <NavLink to={"/"}>
            <img src={logo} alt="Alquila tu cancha" className="h-10 " />
          </NavLink>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <DisabledNavLink to={"/match"} disabled={!team1.name || !team2.name}>
          <Button
            disabled={!team1.name || !team2.name}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Nuevo partido</span>
          </Button>
        </DisabledNavLink>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <DisabledNavLink to={"/match"}>
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
              disabled={!team1.name || !team2.name}
            >
              <span>Nuevo partido</span>
            </Button>
          </DisabledNavLink>
        </div>
      </MobileNav>
    </Navbar>
  );
}
