
# Lawatty
Lawatty es una aplicacion web diseñada para estudiar y leer;



# Pipeline CI/CD
Esta aplicacion web integra la tecnica devops de CI/CD para pruebas automatizadas y despliegue automatico.
## Proposito
El proposito para adoptar esta forma de trabajo es para agilizar y facilitar la implementacion de  ()))) y el despliegue de la aplicacion como tal, aumentando significativamente la productividad del equipo.
## objetivos
- **Despliegue Rápido:** Lograr que la aplicacion se despliegue en Vercel al momento de hacer un merge en la rama main
- **Mantener el codigo funcionando:** Se necesita que en todo momento el codigo fuente funcione correctamente para evitar futuros problemas y quebraderos de cabeza
- **:**
## Etapas del Workflow
### 1) Build SonarCloud
 Levanta un Docker container de SonarCloud para usarlo posteriormente en las pruebas
 ### 2) Run actions/checkout@V2
 Copia el repositorio y lo pega en el entorno de github actions
 ### 3) Install dependencies in frontend
 Instala las dependencias necesarias para correr el servidor frontend del proyecto
 ### 4) Test and coverage frontend
 Corre las pruebas del frontend usando el framework de Jest y crea un resumen del coverage que luego usará SonarCloud más adelante
 ### 5) Install dependencies in backend
 Instala las dependencias necesarias para poder correr el servidor backend
 ### 6)Test and coverage backend
 Corre las pruebas relacionadas al backend y crea la carpeta coverage con el resultado de las pruebas
 ### 7)SonarCloud scan
 El Docker container de SonarCloud realiza un escaneo completo de los coverages generados durante las pruebas del frontend y el backend y estos informes los sube a la nube de SonarCloud para que todos puedan verlo, el informe se encuentra [aquí](https://sonarcloud.io/summary/overall?id=David-A-Moreno_desarrollo-lawatty) 

###

