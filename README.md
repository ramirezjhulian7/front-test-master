
# 🖼️ Image Gallery SPA

Este es un proyecto de una **Single Page Application (SPA)** desarrollado en **React** que permite visualizar una galería de imágenes. La aplicación incluye las siguientes funcionalidades:

- **Scroll infinito** para cargar más imágenes dinámicamente.
- **Barra de búsqueda** que filtra las imágenes localmente según el título.
- Funcionalidad de **like/unlike** para cada imagen.
- Diseño **responsivo** para que funcione en diferentes tamaños de pantalla (móvil, tablet, desktop).
- **Pruebas unitarias** para componentes clave.
- **Linteo del código** para mantener consistencia y buenas prácticas.

---

## 🛠️ Tecnologías Usadas

- **React**: Framework JavaScript para la construcción de interfaces de usuario.
- **Styled Components**: Librería para aplicar estilos en componentes de React.
- **React Icons**: Para incluir íconos en la interfaz.
- **Mock API**: Se usa una API mock para simular el comportamiento del servidor.
- **Jest** y **React Testing Library**: Para ejecutar pruebas unitarias.
- **ESLint**: Para el linteo del código, siguiendo buenas prácticas.

---

## 📦 Instalación

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu máquina local.

1. **Clona el repositorio**:
   ```bash
   git clone <URL-del-repositorio>
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el servidor mock**:
   La API mock se encarga de simular el backend. Para ejecutarla, usa el siguiente comando:
   ```bash
   npm run mocks
   ```

4. **Ejecuta la aplicación**:
   Inicia la aplicación en modo de desarrollo.
   ```bash
   npm start
   ```

La aplicación se ejecutará en el navegador en `http://localhost:3000`.

---

## ⚙️ Funcionalidades Clave

### 1. Scroll Infinito
Permite cargar imágenes dinámicamente a medida que el usuario navega por la página. Cada vez que se llega al final, más imágenes se cargan desde el servidor mock.

### 2. Búsqueda en Tiempo Real
Un campo de búsqueda permite filtrar las imágenes por su título de manera local. Si el campo de búsqueda está vacío, se muestran todas las imágenes.

### 3. Funcionalidad Like/Unlike
Cada imagen tiene la opción de ser marcada con "like" o "unlike". Esta acción es gestionada en el estado local de la aplicación.

### 4. Diseño Responsivo
La aplicación adapta su diseño a diferentes tamaños de pantalla, con un grid ajustable que va desde una columna en móviles hasta cuatro columnas en pantallas grandes.

---

## 🧪 Pruebas Unitarias

Se han escrito **pruebas unitarias** para garantizar la funcionalidad de los componentes clave utilizando **Jest** y **React Testing Library**.

Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm test
```

---

## 🔍 Linteo de Código

El proyecto utiliza **ESLint** para mantener el código limpio y consistente. El linteo se realiza en cada commit o también puede ser ejecutado manualmente con:

```bash
npm run lint
```

---

## 📂 Estructura del Proyecto

```bash
├── public/              # Archivos públicos (index.html, favicon, etc.)
├── src/
│   ├── components/      # Componentes React
│   │   ├── ImageCard/   # Componente de cada tarjeta de imagen
│   │   ├── ImageGrid/   # Componente del grid de imágenes
│   │   └── SearchBar/   # Barra de búsqueda
│   ├── hooks/           # Custom Hooks
│   ├── services/        # Llamadas a la API mock
│   ├── styles/          # Estilos (CSS y assets como imágenes)
│   ├── tests/           # Pruebas unitarias
│   ├── App.js           # Componente principal
│   ├── App.test.js      # Pruebas del componente App
│   ├── index.js         # Archivo de entrada
│   └── index.css        # Estilos globales
├── .gitignore           # Ignora archivos no necesarios en el repositorio
├── eslint.config.mjs    # Configuración de ESLint
├── mocks.config.js      # Configuración de la API mock
├── package.json         # Configuración del proyecto y dependencias
└── README.md            # Documentación del proyecto
```

---

## 📜 Contacto

**Jhulian Ramírez**  
Para cualquier consulta o sugerencia, puedes contactarme a través de:

- **Correo Electrónico**: [ramirezjhulian7@gmail.com](mailto:ramirezjhulian7@gmail.com)  
- **LinkedIn**: [jhulianramirez](https://www.linkedin.com/in/jhulianramirez/)
- **Git**: [jhulianramirez](https://github.com/ramirezjhulian7/front-test-master)
