# ⚡ AutoFlow

> Solución B2B SaaS "llave en mano" diseñada para transformar canales de mensajería (WhatsApp) en puntos de venta inteligentes y autónomos para PyMEs.

![Equipo](https://img.shields.io/badge/Team-JAVAWOKIS-blueviolet?style=for-the-badge)
![Metodología](https://img.shields.io/badge/Metodología-Scrum-cyan?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Cloud-AWS-orange?style=for-the-badge)

---

## 📌 Descripción del Proyecto

**AutoFlow** es una plataforma de software como servicio (SaaS) orientada al segmento **B2B** que automatiza la operativa de ventas, cotizaciones y pedidos en tiempo real a través de WhatsApp. 

Está pensada específicamente para pequeñas y medianas empresas (PyMEs), comercios locales, boutiques y tiendas artesanales que sufren saturación operativa al gestionar ventas manuales mediante PDFs, mensajes dispersos y registros en papel.

### 💡 Propuesta de Valor ("Done-for-you")
A diferencia de herramientas genéricas de bots que exigen diseñar flujos complejos o plataformas de comercio que sacan al cliente del chat, **AutoFlow** opera sin fricción técnica:
- El cliente final consulta el catálogo interactivo, cotiza, realiza su pedido y rastrea entregas **directamente dentro de WhatsApp**.
- El comercio únicamente se encarga de despachar el producto y supervisar métricas desde su panel de control centralizado.

---

## 🎯 Arquitectura de Vistas (Navegación Web)

La plataforma web contempla 7 módulos esenciales:

1. **Página Principal (Home):** Hero banner con propuesta de valor, demostración del flujo en WhatsApp, planes de suscripción y testimonios.
2. **Catálogo de Soluciones / Paquetes:** Detalle de módulos contratables (cotizaciones dinámicas, gestión de pedidos y seguimiento logístico).
3. **Página de Formulario (Cotización / Onboarding):** Cuestionario guiado para diagnosticar necesidades del negocio y generar su propuesta.
4. **Login / Registro:** Autenticación segura y gestión de credenciales para comercios afiliados.
5. **Dashboard del Cliente:** Panel de administración donde el negocio gestiona su catálogo, inventario, pedidos activos y métricas de clientes.
6. **Acerca de Nosotros:** Misión, visión, valores y filosofía del equipo de desarrollo.
7. **Contacto & Soporte:** Formulario de atención técnica y canales de asistencia directa.

---

## 🛠️ Stack Tecnológico

| Capa / Módulo | Tecnología / Herramienta | Aplicación en el Proyecto |
| :--- | :--- | :--- |
| **Front-End** | HTML5, CSS3, Bootstrap 5 | Interfaz responsiva, maquetación semántica y accesible |
| **Lógica de Cliente** | JavaScript (ECMAScript 6+) | Manipulación asíncrona del DOM, validaciones y consumo de APIs |
| **Back-End** | Java & Spring Boot | Arquitectura de servicios RESTful, seguridad y lógica transaccional |
| **Base de Datos** | MySQL | Modelado relacional para comercios, pedidos, catálogos y suscripciones |
| **Testing de APIs** | Postman | Verificación y pruebas funcionales de endpoints |
| **Versionado & Trabajo en Equipo** | Git & GitHub | Flujo de trabajo basado en ramas por feature, Pull Requests y Code Reviews |
| **Prototipado UI/UX** | Figma | Diseño visual de interfaces, mockups y flujo de usuario |
| **Despliegue & Cloud** | AWS | Infraestructura en la nube para el entorno de producción |

---

## 👥 Equipo de Desarrollo (JAVAWOKIS)

| Integrante | Rol / Responsabilidad Técnica |
| :--- | :--- |
| **Patsy Ericka Infante Martinez** | Scrum Master &  Developer |
| **María del Roble Luna Hernández** | Developer |
| **María Fernanda García Rocha** | Developer |
| **Kevin Aldaba Hernandez** | Developer |
| **Marco Daniel Vazquez Fernández** | Developer |
| **Yhibran Isai Coria Colón** |  Product Owner, Developer & Front-End Developer |

---

## 🚀 Puesta en Marcha en Local

### Prerrequisitos
- **Java JDK 17+**
- **Node.js** (opcional, para herramientas de build si aplican)
- **MySQL Server 8.0+**
- **Git**
- IDE recomendado: IntelliJ IDEA, VS Code o Eclipse

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Javawokis/autoflow.git](https://github.com/Javawokis/autoflow.git)
cd autoflow
