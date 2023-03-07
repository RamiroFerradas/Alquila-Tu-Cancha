import { useState } from "react";

export default function Players({ showModal, setShowModal, players }) {
  const [imagenesCargadas, setImagenesCargadas] = useState(false);

  const manejarCargaImagen = () => {
    setImagenesCargadas(true);
  };
  return (
    <div
      className={`z-10 fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg ${
        showModal ? "block" : "hidden"
      }`}
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white p-4 mx-auto my-12 container grid grid-cols-1 md:grid-cols-6 gap-4 h-4/5 overflow-y-scroll rounded-xl"
      >
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        {players?.map(({ player_name, player_image }) => (
          <div key={player_name}>
            <p>{player_name}</p>
            <img src={player_image} loading="eager" alt={player_name} />
          </div>
        ))}
        {/* Contenido de la ventana modal */}
      </div>
    </div>
  );
}
