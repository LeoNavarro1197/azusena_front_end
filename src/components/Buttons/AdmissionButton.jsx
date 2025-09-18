import React from "react";
import { ReactComponent as AdmissionIcon } from "../../assets/button-icons/OpcAdmisiones.svg";

const AdmissionButton = ({ onClick }) => {
    return (
        <button 
            className="m-1 mx-auto py-1 px-1 rounded"
            onClick={() => onClick('¿Cómo puedo ser admitido en el servicio de salud y cuál es el proceso completo de admisión?')}
        >
            <AdmissionIcon className="button-icon inline-block mr-2" />
        </button>
    );
};

export default AdmissionButton;
