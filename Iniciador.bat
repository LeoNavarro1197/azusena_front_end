@echo off

:: Iniciar el proyecto React

@REM cd AzuSena-React
git checkout main
git pull
start powershell -NoExit -Command "npm start"
cd ..

:: Iniciar el Backend en Python
cd ..
cd AzuSena-Backend
git checkout main
git pull
start powershell -NoExit -Command "& .\venv\Scripts\Activate; python -m flask run; deactivate"
cd ..

echo Ambos proyectos se han iniciado.
