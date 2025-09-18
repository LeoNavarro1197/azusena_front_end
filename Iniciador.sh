#!/bin/bash

# Iniciar el proyecto React
(
    # cd AzuSena-React
    npm start
) &

# Iniciar el Backend en Python
(
    cd ..
    cd AzuSena-Backend
    source ./venv/bin/activate
    python -m flask run
    deactivate
) &

# Esperar a que ambos procesos terminen
wait

echo "Ambos proyectos se han iniciado."
