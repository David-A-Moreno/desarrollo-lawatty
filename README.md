# Lawatty
Lawatty es una aplicacion web diseñada para estudiar y leer;

Aplicación que ayuda a manejar mejor el tiempo y mejorar la productividad

# Pipeline CI/CD
Esta aplicacion web integra la tecnica devops de CI/CD para pruebas automatizadas y despliegue automatico.
## Proposito
El proposito para adoptar esta forma de trabajo es para agilizar y facilitar el despliegue de la aplicacion como tal, aumentando significativamente la productividad del equipo.
## objetivos
- Despliegue Rápido: Lograr que la aplicacion se despliegue en Vercel al momento de hacer un merge en la rama main
- Mantener el codigo funcionando: Se necesita que en todo momento el codigo fuente funcione correctamente para evitar futuros problemas y quebraderos de cabeza
## Etapas del Workflow
 ### 1) Run actions/checkout@V2
 Copia el repositorio y lo pega en el entorno de github actions
 ### 2) Install dependencies
 Instala las dependencias necesarias para correr el servidor frontend y backend del proyecto.
 ### 3) Test and coverage
 Corre las pruebas del frontend y el backend usando el framework de Jest y crea un resumen del coverage que luego usará SonarCloud más adelante.
 ### 4)SonarCloud scan
 El Docker container de SonarCloud realiza un escaneo completo de los coverages generados durante las pruebas del frontend y el backend y estos informes los sube a la nube de SonarCloud para que todos puedan verlo, el informe se encuentra [aquí](https://sonarcloud.io/summary/overall?id=David-A-Moreno_desarrollo-lawatty) 

### 5)Deploy Preview
En esta estapa se instala y ejecuta los comandos relacionados a la creacion del ambiente de Vercel para desplegar una preview del backend y del frontend en la pagina web (Una preview no es lo mismo que la version de produccion del programa)
### 6)Deploy Production
En el dado caso de que los cambios se hayan realizado en la rama main y se hayan pasado las pruebas, se instalaran los archivos necesarios para ejecutar el despliegue en el entorno de produccion de Vercel
### 
# Ejecucion de pruebas
Para la ejecucion de pruebas tanto del backend como del frontend se usó el framework de Jest, que se usa para pruebas de javascript, los archivos de estas pruebas se encuentran en las carpetas ./backend/test y ./frontend/_tests _ y el coverge se verifica en SonarCloud    
# Ejecucion de los despliegues
Para el despliegue usamos la pagina Vercel, la cual despliega automaticamente cuando se realiza un cambio en la rama main (Lo cual solo es posible mediante un merge después de pasar las pruebas )
# Monitoreo
El monitoreo se hizo mediante la herramienta analytics de Vercel y usando el apartado de métricas de mongoDB
# Notificaciones
Las notificaciones llegan a un canal de slack cada vez cuando se hacen cambios en el repositorio

