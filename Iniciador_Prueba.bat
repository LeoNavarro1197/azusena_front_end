@echo off

:: Establecer la ruta base como el directorio donde se encuentra este archivo .bat
set BASE_DIR=%~dp0

:: Cambiar al directorio base
cd /d %BASE_DIR%

:: Iniciar el proyecto React
cd AzuSena-React
git fetch
git checkout ASZ_EntregaFinal
git pull origin ASZ_EntregaFinal
start powershell -NoExit -Command "npm start"
cd ..

:: Iniciar el Backend en Python
cd AzuSena-Backend
git fetch
git checkout ASZ_EntregaFinal
git pull origin ASZ_EntregaFinal

:: Verificar entorno virtual y activarlo
if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)
start powershell -NoExit -Command "& %BASE_DIR%AzuSena-Backend\venv\Scripts\Activate.ps1; pip install -r requirements.txt; python -m flask run"

pause Ambos proyectos se han iniciado.
