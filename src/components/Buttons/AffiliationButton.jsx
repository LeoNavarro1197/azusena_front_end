import React from "react";
import { ReactComponent as AffiliationIcon } from "../..//assets/button-icons/OpcAseguramiento.svg";

const AffiliationButton = ({ onClick }) => {
    return (
        <button 
            className="m-1 mx-auto py-1 px-1 rounded"
            onClick={() => onClick('¿Cómo puedo afiliarme a una EPS y acceder a los servicios de salud?')}
        >
            <AffiliationIcon className="button-icon inline-block mr-2" />
        </button>
    );
};

export default AffiliationButton;
