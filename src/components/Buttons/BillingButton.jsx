import React from "react";
import { ReactComponent as BillingIcon } from "../../assets/button-icons/OpcFacturacion.svg";

const BillingButton = ({ onClick }) => {
    return (
        <button 
            className="m-1 mx-auto py-1 px-1 rounded"
            onClick={() => onClick('¿Cómo se calculan y pagan los copagos y las cuotas moderadoras en los servicios de salud?')}
        >
            <BillingIcon className="button-icon inline-block mr-2" />
        </button>
    );
};

export default BillingButton;
