# Sistema Web de Gestión de Deudas - Documentación del Proyecto

## 📋 Información General del Proyecto

**Nombre del Proyecto:** Implementación de un sistema web para la digitalización y automatización del registro de deudas de clientes

**Institución:** Universidad de Pamplona  
**Programa:** Ingeniería de Sistemas  
**Asignatura:** Gestión de Proyectos  
**Grupo:** CR  
**Período:** Diciembre 2025

**Autores del Proyecto:**
- Kevin Andrés Morales Cárdenas
- Sebastián David Mazo Patiño
- Adrian Camilo Vera Duran
- Breyner Javier Castillo Flórez
- Carlos Steven Capacho Castro

**Docente:** Luis Fernando Gelves Rodríguez

---

## 🎯 Planteamiento del Problema

### Problema Central
Muchos negocios pequeños y medianos gestionan información financiera mediante métodos manuales obsoletos. Específicamente, el registro y control de deudas se realiza exclusivamente en cuadernos físicos, lo que genera:

- **Errores frecuentes** en anotaciones y cálculos
- **Pérdida de información** por deterioro, extravío o confusión
- **Falta de centralización** de datos
- **Búsquedas ineficientes** requiriendo revisar página por página
- **Procesos tediosos** para sumas y cálculos de saldos
- **Ausencia de mecanismos** para prevenir errores

### Población Afectada
- Tiendas de barrio
- Misceláneas
- Papelerías
- Talleres
- Emprendedores informales

### Causas Principales
1. **Falta de digitalización:** Obliga a realizar cálculos repetidos de saldos y fechas
2. **Ausencia de formato estandarizado:** Cada persona anota de manera distinta
3. **Baja adopción tecnológica:** Desconocimiento, falta de capacitación o creencia de que cuadernos son suficientes

### Consecuencias
- Pérdida de tiempo al buscar información
- Demoras en procesos del negocio
- Errores en montos, fechas o registros incompletos
- Deterioro o pérdida de cuadernos
- Discrepancias sin poder verificarse
- Falta de históricos confiables
- Imposibilidad de generar estadísticas o reportes
- Limitación en capacidad de administración y crecimiento

---

## ✅ Justificación

La gestión manual de deudas presenta riesgos administrativos y financieros significativos que justifican plenamente una solución tecnológica:

1. **Riesgo de datos críticos:** La dependencia del papel expone a pérdida de información vital
2. **Control financiero deficiente:** Sin registros confiables, es imposible controlar cuentas por cobrar
3. **Relación cliente-negocio afectada:** Errores generan desconfianza
4. **Vulnerabilidad operacional:** Información puede extraviarse o confundirse
5. **Necesidad de modernización:** Proporcionar claridad, respaldo y eficiencia en control de deudas

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico General
- **Base de datos:** PostgreSQL (sistema relacional)
- **Backend:** Python + Django + Django REST Framework
- **Frontend:** React.js + JavaScript + TypeScript
- **Arquitectura:** Cliente-Servidor con API REST

---

## 💾 Base de Datos

### Tecnología: PostgreSQL

**Razones de selección:**
- Sistema de gestión relacional robusto
- Cumplimiento estricto de estándares SQL
- Soporte nativo para transacciones ACID
- Prevención de pérdidas o corrupción de datos
- Garantía de integridad y consistencia en transacciones financieras

**Modelo de Datos:**
- Entidades principales: Clientes, Deudas, Pagos, Saldos
- Diseño con modelo entidad-relación (MER) bien estructurado
- Reglas de integridad claras y eficientes
- Soporte para históricos y auditoría

**Características Esperadas:**
- Gestión de relaciones entre clientes y deudas
- Registro detallado de pagos e historiales
- Cálculo automático de saldos
- Integridad referencial en operaciones financieras

---

## 🔧 Backend

### Tecnología: Python + Django + Django REST Framework

**Lenguaje:** Python

**Razones de selección:**
- Sintaxis clara y legible
- Amplio ecosistema de librerías
- Agilización del desarrollo
- Comunidad activa y soporte

**Framework:** Django

**Razones de selección:**
- Framework de alto nivel con herramientas integradas
- Módulos y funciones esenciales ya construidos
- Seguridad robusta integrada desde la base
- Sistema de autenticación fuerte
- Panel de administración automático
- Protecciones contra vulnerabilidades web comunes (OWASP)
- Acelera desarrollo sin sacrificar seguridad

**API:** Django REST Framework

**Funcionalidad:**
- Exposición de funcionalidades mediante API REST
- Comunicación segura y eficiente con frontend
- Endpoints para operaciones CRUD
- Autenticación y autorización
- Validación de datos

**Funcionalidades Backend Esperadas:**
- Gestión de usuarios (clientes, administradores)
- CRUD de clientes
- Registro de deudas y transacciones
- Cálculo automático de saldos
- Generación de reportes
- Auditoría de cambios
- Validación de transacciones
- Respaldos de datos

---

## 🎨 Frontend

### Tecnología: React.js + JavaScript + TypeScript

**Librería Principal:** React.js

**Razones de selección:**
- Modelo basado en componentes reutilizables
- Componentes completos y modulares
- Aceleración del desarrollo
- Facilita mantenibilidad
- Consistencia visual
- Rendimiento optimizado
- Interfaz interactiva y reactiva

**Lenguaje:** JavaScript con TypeScript

**TypeScript agregado para:**
- Tipado estático al código JavaScript
- Detección de errores en fase de desarrollo
- Mejora de calidad del código
- Mayor mantenibilidad

**Librerías Complementarias:**
- Gestión de estado de la aplicación
- Comunicación con API backend
- Interfaz fluida y reactiva

**Diseño Centrado en Usuario (DCU):**
- Prioridad en experiencia interactiva
- Interfaz intuitiva
- Usabilidad optimizada
- Experiencia tanto para administrador como cliente

**Funcionalidades Frontend Esperadas:**
- Dashboard administrativo
- Módulo de gestión de clientes
- Registro de deudas
- Registro de pagos
- Consulta de saldos
- Generación de reportes visuales
- Historial de transacciones
- Interfaz responsiva (móvil/desktop)

---

## 📊 Estructura de Módulos Principales

### Módulo 1: Gestión de Clientes
- Crear cliente
- Consultar cliente
- Actualizar información
- Eliminar cliente
- Ver historial de cliente
- Búsqueda y filtrado

### Módulo 2: Gestión de Deudas
- Registrar nueva deuda
- Visualizar deudas activas
- Actualizar estado de deuda
- Cancelar deuda
- Filtrado por cliente
- Clasificación por antigüedad

### Módulo 3: Gestión de Pagos
- Registrar pago
- Asignar pago a deuda
- Visualizar histórico de pagos
- Generar recibos digitales
- Validación de montos

### Módulo 4: Reportes y Análisis
- Reporte de deudas por cobrar
- Deudas vencidas
- Estadísticas de pago
- Análisis de patrones
- Exportación de datos
- Gráficos visuales

### Módulo 5: Autenticación y Seguridad
- Login de usuarios
- Gestión de roles (admin, empleado, cliente)
- Control de acceso
- Auditoría de cambios
- Respaldo de datos

---

## 🔐 Consideraciones de Seguridad

**Estándares a implementar:**
- Protecciones OWASP Top 10
- Autenticación fuerte
- Encriptación de datos sensibles
- Validación de entrada
- Control de sesiones
- Auditoría de acciones
- Respaldos regulares
- HTTPS obligatorio

---

## 📅 Cronograma (Referencial)

El proyecto debe incluir fases de:
1. Análisis y diseño de base de datos
2. Desarrollo backend (API REST)
3. Desarrollo frontend (interfaz)
4. Integración y testing
5. Despliegue
6. Capacitación y documentación

---

## 💼 Recursos Necesarios

- Servidor para hosting
- Base de datos PostgreSQL
- Entorno de desarrollo
- Herramientas de versionamiento (Git)
- Herramientas de testing
- Herramientas de despliegue
- Documentación técnica

---

## 🎁 Resultados Esperados

### Para los Negocios:
- Digitalización completa del registro de deudas
- Reducción de errores en cálculos y anotaciones
- Acceso rápido y centralizado a información
- Generación de reportes automáticos
- Mejor toma de decisiones
- Aumento de eficiencia operacional
- Mayor confianza de clientes

### Para los Clientes:
- Transparencia en registros
- Respuesta rápida a consultas
- Verificación inmediata de saldos
- Recibos digitales
- Mejor experiencia de servicio

### Técnicos:
- Sistema escalable y mantenible
- Arquitectura moderna y modular
- Documentación completa
- Código limpio y seguro
- Base sólida para mejoras futuras

---

## 🚀 Instrucciones para Desarrollo con IA

Cuando compartas este documento con una IA para el desarrollo:

1. **Contexto claro:** La IA entenderá el problema, justificación y objetivos
2. **Especificaciones técnicas:** Stack definido (Python/Django/React)
3. **Módulos desglosados:** Cada módulo está claramente identificado
4. **Requisitos funcionales:** Funcionalidades esperadas en cada módulo
5. **Consideraciones técnicas:** Seguridad, base de datos, arquitectura

### Flujo sugerido con IA:
1. Pedir diseño del modelo de base de datos (MER)
2. Pedir desarrollo de modelos Django
3. Pedir desarrollo de API endpoints
4. Pedir desarrollo de componentes React
5. Pedir integración frontend-backend
6. Pedir testing e implementación de seguridad
7. Pedir documentación de APIs

---

## 📚 Referencias del Proyecto Original

- Bass, L., Clements, P., & Kazman, R. (2022). *Software Architecture in Practice*
- Connolly, T. M., & Begg, C. E. (2023). *Database Systems: A Practical Approach*
- Elmasri, R., & Navathe, S. B. (2021). *Fundamentals of Database Systems*
- ISO/IEC/IEEE 42010:2023 - Arquitectura de Software
- OWASP Top 10 2023 - Seguridad Web
- Project Management Institute. (2022). *PMBOK® Guide* (7th ed.)

---

## 📝 Notas Finales

Este documento consolida toda la información del proyecto de gestión de deudas en un formato estructurado y listo para compartir con herramientas de IA para desarrollo. Incluye:

- ✅ Planteamiento claro del problema
- ✅ Justificación sólida
- ✅ Stack tecnológico definido
- ✅ Arquitectura desglosada
- ✅ Módulos principales especificados
- ✅ Consideraciones de seguridad
- ✅ Resultados esperados

**Para obtener mejor resultado con IA:**
- Especifica qué módulo quieres desarrollar primero
- Pide código ejemplo o estructura de carpetas
- Solicita tests unitarios
- Solicita documentación de API
- Pide ayuda con debugging si es necesario

---

**Generado como referencia para desarrollo colaborativo con IA**  
**Proyecto: Sistema Web de Gestión de Deudas - Universidad de Pamplona**
