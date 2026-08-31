Parte 1 - Componente Teórico
+ Pregunta 1 - Entorno de desarrollo y sistema operativo
a) 
- Node.js y npm: Node ejecuta un entorno de JavaScript por fuera del navegador y corre las herramientas necesarias
para el desarrollo. Npm administra e instala los paquetes y dependencias necesarias para el proyecto.

- Metro bundler: Este es el contenedor de React Native. Toma todo el código, componentes y assets de JavaScript, los
transforma y crea un único paquete que la aplicación consume.

- JDK y Android SDK: El JDK proporciona el compilador de Java necesario para android. El Android SDK contiene las librerías
del sistema, emuladores y herramientas como adb para compilar ejecutar apps en Android.

- Xcode: Xcode es el entorno oficial de Apple (solo macOS) que incluye el SDK, el compilador y emulador de IOS necesarios
para construir, firmar y empaquetar apps para IOS.

- Expo GO: App para dispositivos físicos que permite ejecutar y testear proyectos de Expo escaneando un código QR sin tener
que compilar el código nativamente.

b) 
- Para compilar aplicaciones IOS depende enteramente de las propias herrmientas de Apple(Xcode, compilador Clang y utilidades
de firma de certificados) que son ilimitadas y solo funcionan en macOS. Si quieren testear la app tendrán que usar alternativas como: 
    - Utilizar EAS Build (Expo Aplication Services) o herramientas CI/CD con ejecutores macOS (como GitHub Actions) para crear archivos
    binarios (.ipa) sin ncesidad de un Mac física. 
    - Probar la aplicación usando Expo GO en un iPhone físico, o alquilar una máquina virtual macOS en la nube (como MacinCloud, 
    AWS EC2 Mac) para la compilación final y lanzarla finalmente en la App Store.

c) 
- Las variables de entorno son variables dinámicas a nivel de sistema operativo que almacena rutas y configuraciones gobales para
que los programas y terminales puedan encontrarse entre sí.
- Las fallas con Android_Home y PATH ocurren porque el emulador y el CLI deben saber exactamente dónde se encuentran el Android SDK.
Si Android_Home o el PATH están mal configurados, el sistema no podrá encontrar archivos ejecutables críticos como adb o emulator, 
impidiendo levantar o instalar el APK.
- Las variables de usuario sólo son válidas para la cuenta de usuario que ha iniciado sesión actualmente, mientras que las variables 
del sistema se aplican globalmente a todos los usuarios del equipo.

d)
- En Expo: 
    - Ventajas: La configuración inicial es casi instantánea y no es necesario configurar Android Studio o Xcode al inicio; Facilita pruebas rápidas con Expo Go y ensamblaje en la nube con EAS.

    - Limitaciones: Dependencia de librerías compatibles con su ecosistma; Menos control directo si no se utiliza el flujo de prebuild (npx expo prebuild)

    - Elección: Para desarrollar rápidamente MVP, prototipos o aplicaciones estándar sin tener que procesar código nativo en Objective-C/C o Java de bajo nivel.

- En React Native CLI: 
    - Ventajas: Control total sobre los directorios raíz (/android y /ios); Vincule libremente cualquier módulo nativo personalizado o SDK de terceros.
     
    - Limitaciones: Configuración de entorno inicial compleja y propensa a errores; mantenimiento manual de actualizaciones y dependencias nativas.

    - Elección: Proyectos empresariales grandes que requieren integraciones nativas de hardware especializadas, librerías heredadas o arquitecturas nativas a medida.

+ Pregunta 2 - Fundamentos de React Native
a)
- <div> (<View> en React)
- <p> / <span> (<Text> en React)
- <img> (<Image> en React)
- <input> (<TextInput>)
- Lista larga con scroll (<FloatList>)

b) 
- flexDirection por defecto: En React Native es "column" (a diferencia de la web, donde es "row"). Esto responde a la naturaleza de los teléfonos móviles, que están diseñados para orientación vertical, donde los elementos se apilan naturalmente de arriba a abajo.
-  Se escriben como objetos de JavaScript en formato camelCase (backgroundColor, fontSize) y las dimensiones numéricas representan puntos independientes de densidad (dp), no píxeles fijos ni sufijos como px o rem.
- No existe un modelo en cascada ni especificadores globales (como clases o :hover).
Cada estilo se implementa explícitamente utilizando el atributo de estilo a través de StyleSheet.create.

c) 
- Las props son características que un componente padre envía a un componente hijo para configurarlo o mostrarlo. Por otro lado, el estado (state) guarda información que puede cambiar y es particular del componente mismo, y cuando se actualiza (como con useState), genera una nueva representación de la interfaz visual.
    Ejemplo: 
        - State: El arreglo con la lista de productos filtrados o descargados del backend (const [productos, setProductos] = useState([])), o el texto que el usuario escribe en la barra de búsqueda.
        - Prop: El elemento único { id, nombre, precio } que el contenedor de la lista envía como argumento al componente secundario.

Pregunta 3 - Manejo de pantallas y navegación
a) 
- Stack: 
    - Función: Organiza las pantallas en una pila secuencial (LIFO); cada pantalla nueva se superpone a la anterior y al retroceder se destruye de la cima.
    - Casos de Uso: Flujo de navegación en orden jerárquico o secuencial, como moverse desde una selección de productos hacia la pantalla de detalles o el proceso de pago.

- Tabs: 
    - Función: Facilita el cambio entre diferentes vistas principales a través de una barra de pestañas fija (normalmente ubicada en la parte inferior).
    - Caso de Uso: Vistas principales de una red social (Inicio, Búsqueda, Notificaciones y Perfil).

- Drawer: 
    - Función: Ofrece un menú lateral que se esconde fuera de la vista y se despliega al deslizar o al presionar un botón de menú.
    - Caso de Uso: Aplicaciones que cuentan con varias secciones secundarias o configuraciones detalladas, como Gmail o aplicaciones de banca.

b)
- El NavigationContainer se encarga de administrar el estado central del conjunto de rutas, supervisa el historial de navegación e intercepta eventos externos, como enlaces profundos o el botón de retroceso del sistema. Solo debe haber uno en la parte principal del proyecto, ya que es el componente que organiza la sincronización de todos los navegadores secundarios; contar con varios contenedores generaría estados de navegación repetidos y conflictos al manejar transiciones entre diferentes pantallas.

c)
- Se pasa como segundo parámetro en la invocación navigation. navigate('NombrePantalla', { id: '123' }) y se obtiene en la pantalla de destino a través de route. params. id o usando el hook useRoute().
- Conviene enviar únicamente su identificador (ID)
- Enviar artículos pesados puede sobrecargar el estado de navegación, lo que podría hacer que la pantalla muestre información desactualizada si hay cambios en la base de datos. Al transmitir solamente el ID, la pantalla de destino puede obtener los datos más actualizados, lo que simplifica el uso de enlaces profundos.

d) 
- La pantalla A mantiene su condición, puesto que no se desarma; únicamente se queda por debajo de la pantalla B en la secuencia de navegación. Al refrescar, un useEffect que se ha configurado con dependencias vacías [] en la pantalla A no se ejecutará nuevamente al volver de la pantalla B. Por eso, para mostrar un nuevo registro que se creó en B, se debe usar el hook useFocusEffect de React Navigation para actualizar los datos o establecer una suscripción en tiempo real con Firestore (onSnapshot).

e) 
- Android cuenta con un botón físico o gesto universal de retorno a nivel de hardware que debe funcionar en cualquier app. Por otro lado, iOS no tiene un botón de retroceso universal y se basa en gestos de deslizamiento desde el lado izquierdo o en botones que están en la barra de navegación superior.
- React Navigation conecta de forma automática el BackHandler de Android para captar el retroceso del sistema y ofrece los controladores de gestos nativos de iOS, lo que permite un funcionamiento uniforme y fácil de usar sin necesidad de escribir código específico para cada plataforma.

Pregunta 4 - Configuración base de Firebase
a)
-   1. Crear proyecto: Ingresar a Firebase Console y crear un nuevo proyecto.
    2. Registrar aplicación: Crear una app web dentro del proyecto para obtener el objeto de configuración (firebaseConfig).
    3. Habilitar Firestore: Ir a Cloud Firestore, crear la base de datos (seleccionando región y reglas iniciales) y crear la colección base.
    4. Instalar el SDK: Ejecutar npx expo install firebase en el proyecto de React Native.
    5. Configurar variables de entorno: Crear un archivo .env en local para alojar las claves sin versionarlas en Git.
    6. Inicializar en código: Crear un archivo centralizado (ej. src/services/firebase.js), importar initializeApp y getFirestore, y exportar la instancia de db.

b)
- apiKey: Clave pública que valida las solicitudes del usuario frente a las APIs de Google Cloud y conecta la aplicación con el proyecto.
- projectId: ID exclusivo y global del proyecto en Google Cloud/Firebase donde se encuentran la base de datos y los recursos.
- appId: Id único de la aplicación del cliente que se ha inscrito en ese proyecto particular de Firebase.
- storageBucket: Nombre del depósito de almacenamiento en Google Cloud Storage vinculado al proyecto para cargar y administrar archivos de medios.

c)
- La apiKey de Firebase se utiliza solo para identificar el proyecto ante los servidores de Google y guiar las peticiones de red, no funciona como un credential secreto de administración. La verdadera seguridad y protección de la información depende únicamente del servidor a través de las Reglas de Seguridad de Firestore que, en conjunto con Firebase Authentication, comprueban si el usuario que hace la solicitud tiene autorización para leer o escribir en cada documento.

d)
- Comparando: 
    - Firestore clasifica la información en colecciones y documentos estructurados (con soporte para subcolecciones), mientras que Realtime Database la guarda en un solo árbol JSON monolítico y anidado.
    - Firestore soporta consultas complejas, indexación automática y múltiples filtros sin la necesidad de descargar datos anidados no deseados; la Base de Datos Realtime posee capacidades de filtrado y ordenamiento reducidas.
    - Firestore escala de forma automática y horizontal a nivel global; Realtime Database requiere escalado vertical o particionamiento manual (sharding).

- Usaría Cloud FireStore, porque su modelo de colecciones y documentos se adapta de forma directa al esquema de la colección contactos, facilitando la lectura granular por identificador para la pantalla de detalle sin sobrecargar la red.