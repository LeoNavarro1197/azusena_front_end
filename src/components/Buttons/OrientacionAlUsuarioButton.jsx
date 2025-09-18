import React from "react";
import { ReactComponent as PQRSIcon } from "../../assets/button-icons/OpcOrientacionUsuario.svg";

const PQRSButton = ({ onClick }) => {
    return (
        <button 
            className="m-1 mx-auto py-1 px-1 rounded"
            onClick={() => onClick('¿Cómo puedo presentar una PQRS en mi EPS o IPS y cuál es el proceso de seguimiento?')}
        >
            <PQRSIcon className="button-icon inline-block mr-2" />
        </button>
    );
};

export default PQRSButton;
