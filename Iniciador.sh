#!/usr/bin/env bash
# -------------------------------------------------
#  Script actualizado para el nuevo árbol de carpetas
# -------------------------------------------------

# ----------  React (azusena_front_end) ----------
(
    cd azusena_front_end
    # Si la rama principal tiene otro nombre, cámbialo aquí
    git checkout main
    git pull
    npm start
) &

# ----------  Backend (azusena_back_end) ----------
(
    cd azusena_back_end
    # Cambiamos a la única rama existente
    git checkout local_branch
    git pull
    # Activamos el entorno virtual con su nuevo nombre
    source ./azusena_leo_env/bin/activate
    python -m flask run
    deactivate
) &

# Esperar a que ambos procesos terminen
wait

echo "Ambos proyectos se han iniciado."

