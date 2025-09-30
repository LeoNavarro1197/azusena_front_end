@echo off
rem -------------------------------------------------
rem  Script actualizado para el nuevo árbol de carpetas
rem -------------------------------------------------

:: ----------  React (azusena_front_end) ----------
rem Cambiamos al directorio del frontend
cd azusena_front_end
rem Si la rama principal ya no se llama “main”, cámbiala aquí
git checkout main
git pull
rem Iniciamos el servidor con npm en una nueva ventana de PowerShell
start powershell -NoExit -Command "npm start"
cd ..

:: ----------  Backend (azusena_back_end) ----------
rem Subimos al nivel del proyecto y entramos al backend
cd azusena_back_end
rem La única rama disponible se llama local_branch
git checkout local_branch
git pull
rem Activamos el entorno virtual con su nuevo nombre y lanzamos Flask
start powershell -NoExit -Command "& .\azusena_leo_env\Scripts\Activate; python -m flask run; deactivate"
cd ..

echo Ambos proyectos se han iniciado.

