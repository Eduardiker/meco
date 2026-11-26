# 🛡️ M.E.C.O. — Portal Web Oficial y Showcase Interactivo

Sitio web oficial interactivo y showcase de arquitectura para **M.E.C.O.** (*Microkernel Extensible Controlador y Orquestador* // Arquitectura Soberana de 3 Niveles).

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald.svg)](https://eduardiker.github.io/meco/)
[![Architecture](https://img.shields.io/badge/Architecture-3--Tier%20(Core%20%7C%20PAM--CAM%20%7C%20Plugins)-sky.svg)](https://github.com/Eduardiker/meco-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 Enlace del Sitio Web en Vivo

El sitio web está alojado y publicado mediante **GitHub Pages** en:

🔗 **[https://eduardiker.github.io/meco/](https://eduardiker.github.io/meco/)**

---

## 🏛️ Características Principales de la Web

1. **🌳 Visualizador Gráfico de Ramas Arquitectónicas:**
   - Diagrama vectorial interactivo (SVG) que desglosa las **3 ramas fundamentales** de MECO:
     - **Rama 1 (Nivel 1): Microkernel Core** (`core/`): Autoridad criptográfica de permisos, supervisor de plugins con disyuntores y **Modo Esquemático Básico** de rescate sin dependencias.
     - **Rama 2 (Nivel 2): Módulos Nativos PAM & CAM** (`modules/`):
       - `PAM` (*Pregúntale a Meco*): Adaptación contextual de respuestas (Conversacional, Conciso, Técnico, Esquemático).
       - `CAM` (*Conecta a Meco*): Gobernanza de salida a Internet con modo offline y bus IPC prioritario.
     - **Rama 3 (Nivel 3): Plugins Desacoplados de Meco-Hub** (`plugins/`): Estándar oficial de 2 bloques (`calls.py` ➔ `actions.py`).
   - Inspector lateral interactivo con especificaciones técnicas, comandos de terminal y fragmentos de código por cada nodo.

2. **⚡ Simulador de Terminal y Motor PAM en Tiempo Real:**
   - Permite probar comandos en directo (`/estado`, `/seguridad`, `/homelab`, `/offline`, `/schematic`, `/ayuda`) con prompt `iker@homelab:~$`.
   - Conmutador en vivo entre los 4 perfiles de respuesta para observar cómo PAM adapta el mismo paquete de telemetría o delega en el modo esquemático ASCII puro.

3. **🧩 Catálogo Oficial de Plugins y Matriz de Dependencias:**
   - Directorio de los **14 plugins oficiales** certificados con filtrado por categorías y búsqueda predictiva instantánea.
   - Matriz interactiva de dependencias que desglosa qué módulos nativos (PAM / CAM) y permisos del Core requiere cada plugin.
   - Modal de inspección detallada con sumas criptográficas SHA-256, permisos de Nivel 1 requeridos y contratos de ejecución.

4. **📖 meco.docs (Guía Técnica para Desarrolladores del Núcleo):**
   - Documentación técnica exhaustiva para crear **Módulos Nativos del Sistema (Nivel 2)** en `meco-core/modules/`.
   - Comparativa técnica Módulos vs Plugins, contrato de ciclo de vida (`initialize`, `start`, `status`, `shutdown`), guía paso a paso y plantilla boilerplate lista para usar.

5. **🛡️ Pilares de Resiliencia Militar:**
   - Explicación interactiva del escudo canario inotify (<50ms), compactador glibc `malloc_trim(0)`, disyuntores automáticos y la malla UDP táctica fuera de banda ante corte total de fibra.

---

## 📂 Repositorios Vinculados

- **Microkernel Core:** [Eduardiker/meco-core](https://github.com/Eduardiker/meco-core)
- **Catálogo de Plugins:** [Eduardiker/meco-hub](https://github.com/Eduardiker/meco-hub)
- **Portal Web:** [Eduardiker/meco](https://github.com/Eduardiker/meco)
