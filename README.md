Descripción
Este es un proyecto basado en Next que proporciona una plataforma frontend para interactuar con la base de datos del backend y ejecutar la lógica necesaria para el manejo de notas. Este proyecto utiliza React para la interfaz de usuario.

Requerimientos:

Node.js 

npm (Administrador de paquetes de Node)

Instalación
1. Clonar el repositorio
Primero, clona el repositorio de la aplicación usando Git:

git clone <https://github.com/ESPM-II/front-notes-app.git>

2. Navegar al directorio del proyecto
Accede al directorio del proyecto clonado:

cd nombre-del-repositorio

3. Instalar las dependencias
Ejecuta el comando para instalar todas las dependencias utilizadas en el proyecto

npm install

4. Configuración de variables de entorno
Crea un archivo .env en el directorio raíz del proyecto y agrega la siguiente variable:

# URL API BACKEND
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api

Ejecución
1. Ejecutar en modo desarrollo
Para iniciar la aplicación en modo de desarrollo, ejecutar comando:

npm run dev

La aplicación estará disponible en http://localhost:3000.

2. Ejecutar en modo producción
Para ejecutar la aplicación en modo producción debemos hacer un build de la aplicación y luego iniciarla:

npm run build

npm run start
