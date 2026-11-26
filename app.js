/**
 * M.E.C.O. (Módulo de Enlace Central Organizativo) — Aplicación Interactiva
 * Renderizado de Ramas de la Arquitectura de 3 Niveles, Simulador PAM y Catálogo Hub
 */

// ==============================================================================
// 1. DATA: RAMAS ARQUITECTÓNICAS (3 NIVELES DE MECO)
// ==============================================================================
const MECO_BRANCH_DATA = {
  root: {
    id: "root",
    tier: 0,
    title: "M.E.C.O. ROOT",
    subtitle: "Microkernel Soberano (v3.0.0)",
    path: "meco.py",
    badge: "Núcleo Orquestador",
    desc: "Punto de entrada unificado y daemon de supervisión continua. Coordina el arranque del Microkernel de Nivel 1, orquesta los módulos de interacción y red de Nivel 2, y carga el ecosistema de plugins de Nivel 3.",
    specs: {
      "Versión": "3.0.0 (API v3.0)",
      "Runtime": "Python 3.10+ Nativo",
      "Filosofía": "Soberanía tecnológica, privacidad local y desacoplamiento estricto",
      "Consumo RSS": "45 MB – 65 MB (Estabilizado)"
    },
    code: `# Arrancar MECO en modo servicio continuo
python3 meco.py --daemon

# Ejecutar comando directo a través de PAM
python3 meco.py --cmd "/estado"`
  },
  tier1: {
    id: "tier1",
    tier: 1,
    title: "NIVEL 1: Core",
    subtitle: "core/ (Microkernel)",
    path: "core/kernel.py",
    badge: "Nivel 1: Autoridad y Rescate",
    desc: "Núcleo soberano inmutable. Mantiene la autoridad central de permisos criptográficos, supervisa el ciclo de vida de los plugins y ofrece el Modo Esquemático Básico para operar en situaciones de rescate y desastre sin dependencias.",
    specs: {
      "Permisos Centrales": "PermissionAuthority (core/permissions.py)",
      "Modo Esquemático": "SchematicModeEngine (core/schematic.py)",
      "Cargador Plugins": "PluginLoader con Circuit Breakers",
      "Autovacuna": "glibc malloc_trim(0) periódico"
    },
    code: `# Consulta directa al Microkernel en Modo Esquemático Básico (Nivel 1)
python3 meco.py --schematic --cmd "status"

# Salida determinista ASCII sin dependencias externas:
# [MECO:SCHEMATIC] SRC=CORE | STATUS=OK
#   system: {"uptime": "14d 6h", "status": "nominal"}`,
    children: ["core_perms", "core_schematic", "core_loader", "core_state"]
  },
  core_perms: {
    id: "core_perms",
    tier: 1,
    parent: "tier1",
    title: "Permisos Criptográficos",
    subtitle: "core/permissions.py",
    path: "core/permissions.py",
    badge: "Nivel 1: Seguridad",
    desc: "Autoridad central que controla, concede, revoca y audita capacidades en caliente. Ningún plugin o módulo puede ejecutar subprocesos, acceder a Internet o emitir IPC sin un permiso explícito firmado.",
    specs: {
      "Ámbitos": "core:admin, core:storage, pam:interact, cam:internet, cam:ipc, system:exec",
      "Política por Defecto": "Strict Deny",
      "Auditoría": "Registro de eventos en memoria y log firmado"
    },
    code: `# Regla de permisos en config/meco.yaml
plugins:
  security_sentinel:
    allow: ["core:admin", "core:storage", "cam:internet", "system:exec"]`
  },
  core_schematic: {
    id: "core_schematic",
    tier: 1,
    parent: "tier1",
    title: "Modo Esquemático Básico",
    subtitle: "core/schematic.py",
    path: "core/schematic.py",
    badge: "Nivel 1: Rescate",
    desc: "Motor de interfaz determinista de bajo nivel. Proporciona salida estructurada clave-valor en ASCII limpio para operar terminales de rescate o diagnósticos de bajo consumo sin cargar módulos gráficos o conversacionales.",
    specs: {
      "Cero Dependencias": "Opera con la librería estándar pura de Python",
      "Formato": "ASCII determinista clave-valor parseable por máquina",
      "Comandos Núcleo": "/core, /perms, /plugins, /cam, /pam, /schematic"
    },
    code: `engine = SchematicModeEngine(active=True)
output = engine.format_response(
    source="core", status="ok", data={"memory_rss_mb": 52.4, "mode": "rescue"}
)`
  },
  core_loader: {
    id: "core_loader",
    tier: 1,
    parent: "tier1",
    title: "Supervisor de Plugins",
    subtitle: "core/plugin_loader.py",
    path: "core/plugin_loader.py",
    badge: "Nivel 1: Aislamiento",
    desc: "Descubrimiento dinámico de extensiones desde meco-hub, verificación de firmas criptográficas SHA-256, inyección de MecoContext aislado y Circuit Breakers por plugin (CLOSED ➔ OPEN ➔ HALF_OPEN).",
    specs: {
      "Aislamiento": "MecoContext dedicado por plugin con permisos evaluados",
      "Disyuntores": "Aislamiento automático si falla 5 veces en 60 segundos",
      "Sincronización Hub": "Sincroniza y valida sumas SHA-256 con registry.json"
    },
    code: `# Sincronizar catálogo meco-hub y refrescar plugins en caliente
python3 meco.py --sync-hub ../meco-hub --cmd "/ayuda"`
  },
  core_state: {
    id: "core_state",
    tier: 1,
    parent: "tier1",
    title: "Estado y Autovacuna RAM",
    subtitle: "core/state.py",
    path: "core/state.py",
    badge: "Nivel 1: Resiliencia",
    desc: "Persistencia atómica JSON y SQLite WAL para configuración y estado. Implementa autovacuna periódica mediante glibc malloc_trim(0) para mantener un consumo de memoria plano e inmune a fugas.",
    specs: {
      "Persistencia": "Transacciones atómicas con reemplazo seguro",
      "Compactación Heap": "ctypes libc.malloc_trim(0)",
      "Protección": "Bloqueo por socket único (:48899) anti-duplicados"
    },
    code: `# Invocación directa del compactador de memoria
ctypes.CDLL('libc.so.6').malloc_trim(0)
# Mantiene el bot entre 45MB y 65MB indefinidamente`
  },
  tier2: {
    id: "tier2",
    tier: 2,
    title: "NIVEL 2: PAM & CAM",
    subtitle: "modules/ (Interacción & Red)",
    path: "modules/",
    badge: "Nivel 2: Módulos Nativos",
    desc: "Capa intermedia del sistema. PAM (Pregúntale a Meco) adapta las respuestas a las necesidades del usuario en lenguaje humano. CAM (Conecta a Meco) gobierna las conexiones al exterior y la mensajería inter-plugins.",
    specs: {
      "Módulo PAM": "Pregúntale a Meco (modules/pam/)",
      "Módulo CAM": "Conecta a Meco (modules/cam/)",
      "Perfiles de Respuesta": "conversational, concise, technical, schematic",
      "Gobernanza Red": "Circuit breakers por dominio y Modo Offline estricto"
    },
    code: `# El Nivel 2 media entre la frialdad del Core y la riqueza de los Plugins
from modules.pam import ResponseAdapter, UserInteractionEngine
from modules.cam import InternetConnectionManager, InterPluginBus`,
    children: ["pam_adapter", "pam_interaction", "cam_network", "cam_ipc"]
  },
  pam_adapter: {
    id: "pam_adapter",
    tier: 2,
    parent: "tier2",
    title: "PAM: Motor de Respuestas",
    subtitle: "modules/pam/adapter.py",
    path: "modules/pam/adapter.py",
    badge: "Nivel 2: Adaptación",
    desc: "Adapta el tono y estructura de cualquier dato emitido por el sistema según el perfil activo: 'conversational' (amigable), 'concise' (directo al grano), 'technical' (con trazabilidad) o 'schematic' (delegación en Core Nivel 1).",
    specs: {
      "Perfiles Válidos": "conversational | concise | technical | schematic",
      "Fallback": "Delegación limpia en Core Schematic si está activo",
      "Normalización": "Conversión automática de tuplas, diccionarios y listas"
    },
    code: `adapter = ResponseAdapter(default_style="conversational")
# Misma información, adaptada al perfil seleccionado por el usuario:
texto = adapter.adapt({"docker": "7 up", "n100_temp": "39C"})`
  },
  pam_interaction: {
    id: "pam_interaction",
    tier: 2,
    parent: "tier2",
    title: "PAM: Interacción Usuario",
    subtitle: "modules/pam/interaction.py",
    path: "modules/pam/interaction.py",
    badge: "Nivel 2: Interfaz Humana",
    desc: "Motor de procesamiento de comandos y lenguaje natural. Valida la identidad del interlocutor, enruta intenciones hacia los plugins autorizados y devuelve la salida filtrada por ResponseAdapter.",
    specs: {
      "Enrutamiento": "Despacho directo de comandos (/estado, /seguridad, /musica)",
      "Lenguaje Natural": "Detección de intenciones y reenvío a IA/plugins",
      "Permisos": "Exige pam:interact para responder"
    },
    code: `engine = UserInteractionEngine(kernel=microkernel)
respuesta = engine.process_input("/estado", user_id="admin_123")`
  },
  cam_network: {
    id: "cam_network",
    tier: 2,
    parent: "tier2",
    title: "CAM: Gestor de Internet",
    subtitle: "modules/cam/network.py",
    path: "modules/cam/network.py",
    badge: "Nivel 2: Conectividad",
    desc: "Controlador estricto de salida a Internet. Aplica listas blancas de dominios, disyuntores de conexión por host para no saturar hilos y modo 'offline_mode' que bloquea cualquier fuga de datos al exterior.",
    specs: {
      "Modo Offline": "Bloqueo total inmediato de peticiones externas",
      "Circuit Breakers": "Aislamiento por host ante caídas de proveedores",
      "Permiso Obligatorio": "cam:internet evaluado en cada request"
    },
    code: `net = InternetConnectionManager(offline_mode=False)
# Si se activa el modo búnker o se cae la fibra, corta inmediatamente
net.set_offline_mode(True)`
  },
  cam_ipc: {
    id: "cam_ipc",
    tier: 2,
    parent: "tier2",
    title: "CAM: Bus IPC Inter-Plugins",
    subtitle: "modules/cam/ipc.py",
    path: "modules/cam/ipc.py",
    badge: "Nivel 2: Comunicación IPC",
    desc: "Bus de eventos y llamadas cruzadas con 3 niveles de prioridad (P1 Crítica, P2 Interactiva, P3 Background). Permite a los plugins colaborar sin acoplar su código fuente entre sí.",
    specs: {
      "Prioridades": "1 (Alertas/Seguridad) a 3 (Telemetría de fondo)",
      "Aislamiento": "Validación de permisos 'cam:ipc' emisor y receptor",
      "Deadlock-Free": "Despacho asíncrono y timeouts estrictos"
    },
    code: `bus = InterPluginBus()
# Publicar evento crítico de seguridad que escuchará Telegram y Ntfy
bus.publish("security:canary_tripped", {"path": "/shared/docs"}, priority=1)`
  },
  tier3: {
    id: "tier3",
    tier: 3,
    title: "NIVEL 3: Plugins Hub",
    subtitle: "meco-hub (14 Módulos)",
    path: "plugins/",
    badge: "Nivel 3: Ecosistema Desacoplado",
    desc: "Catálogo completo de extensiones modulares alojadas en meco-hub. Todos los plugins siguen el estándar estricto de dos bloques (calls.py para interfaz y actions.py para lógica), operando bajo el contexto aislado del Core.",
    specs: {
      "Estándar 2 Bloques": "calls.py (Ventanilla) ➔ actions.py (Motor)",
      "Módulos Oficiales": "14 plugins certificados en registry.json",
      "Categorías": "Seguridad Crítica, Homelab, IA/Media, Comunicación",
      "Desacoplamiento": "Totalmente independientes de la base de código del Core"
    },
    code: `# Estándar Oficial v2.1 de 2 Bloques
plugins/<nombre_plugin>/
├── calls.py          # Comandos y eventos (BasePluginCalls)
├── actions.py        # Motor de lógica y APIs (BasePluginActions)
├── manifest.json     # Declaración de capacidades y SHA-256
└── README.md         # Documentación de uso`,
    children: ["hub_security", "hub_homelab", "hub_emergency", "hub_telegram"]
  },
  hub_security: {
    id: "hub_security",
    tier: 3,
    parent: "tier3",
    title: "Security Sentinel",
    subtitle: "plugins/security_sentinel",
    path: "plugins/security_sentinel",
    badge: "Nivel 3: Seguridad Crítica",
    desc: "Escudo Anti-Ransomware Canario inotify (<50ms), verificación de integridad de ficheros SHA-256 (FIM), Radar ARP de red LAN y Modo Búnker de aislamiento SMB.",
    specs: {
      "Tipo": "Crítico",
      "Tiempo Reacción": "< 50 milisegundos ante modificación canario",
      "Permisos": "core:admin, core:storage, cam:internet, system:exec"
    },
    code: `# Disparo instantáneo de aislamiento ante manipulación
sentinel.actions.trigger_bunker_mode(reason="canary_compromised")`
  },
  hub_homelab: {
    id: "hub_homelab",
    tier: 3,
    parent: "tier3",
    title: "Homelab Ops",
    subtitle: "plugins/homelab_ops",
    path: "plugins/homelab_ops",
    badge: "Nivel 3: Homelab",
    desc: "Supervisión de Docker Proxy (:2375), Gobernanza Térmica para CPUs de bajo consumo Intel Alder Lake N100, AdGuard Home DNS, Uptime Kuma y backups Restic.",
    specs: {
      "Tipo": "Crítico",
      "Supervisión": "Contenedores Docker, temperatura CPU, SMART SSD",
      "Permisos": "cam:internet, core:storage, system:exec"
    },
    code: `# Consulta de telemetría homelab
/homelab -> "Docker: 18 activos | N100: 38.5°C | SSD SMART: 100% Sano"`
  },
  hub_emergency: {
    id: "hub_emergency",
    tier: 3,
    parent: "tier3",
    title: "Emergency P2P Mesh",
    subtitle: "plugins/emergency_p2p",
    path: "plugins/emergency_p2p",
    badge: "Nivel 3: Resiliencia Táctica",
    desc: "Malla UDP táctica fuera de banda (0% CPU en espera). Se activa de forma automática si cae la fibra óptica, emitiendo balizas HMAC-SHA256 para clientes de rescate.",
    specs: {
      "Tipo": "Crítico",
      "CPU en reposo": "0% (Socket reactivo en espera)",
      "Canal": "Baliza UDP cifrada HMAC para rescate táctico"
    },
    code: `# Activación táctica fuera de banda
/offline -> "Malla P2P Emergencia activada en puerto UDP táctico"`
  },
  hub_telegram: {
    id: "hub_telegram",
    tier: 3,
    parent: "tier3",
    title: "Telegram Gateway",
    subtitle: "plugins/telegram",
    path: "plugins/telegram",
    badge: "Nivel 3: Interfaz Soberana",
    desc: "Pasarela interactiva completa de Telegram. Polling reactivo, teclados interactivos inline, gestión de listas de compra, controles remotos y alertas de seguridad con botones.",
    specs: {
      "Tipo": "Crítico",
      "Interactividad": "Botones inline, fotos, audio neuronal, comandos rápidos",
      "Permisos": "pam:interact, cam:internet, core:admin"
    },
    code: `# Registro de comandos del bot
calls.register_commands() -> {"/estado", "/seguridad", "/compras", "/temperatura"}`
  }
};

// ==============================================================================
// 2. DATA: 14 PLUGINS OFICIALES DE MECO-HUB
// ==============================================================================
const MECO_PLUGINS = [
  {
    id: "security_sentinel",
    name: "Security Sentinel & Canary Shield",
    version: "2.0.0",
    category: "critical",
    critical: true,
    author: "Iker (M.E.C.O. Official)",
    desc: "Escudo Anti-Ransomware Canario inotify (<50ms), FIM SHA-256, Radar ARP LAN, Modo Búnker, Reputación AbuseIPDB y Escáner CVE OSV.dev.",
    sha256: "52471422142e874689c4f6a8b26589fee8f83ddc85b06158d45adeec19aa3a96",
    path: "plugins/security_sentinel",
    permissions: ["core:admin", "core:storage", "pam:interact", "cam:internet", "system:exec"],
    module_deps: {
      pam: true,
      cam_net: true,
      cam_ipc: true,
      core: ["core:admin", "core:storage", "system:exec"]
    },
    dep_explanation: "Depende de PAM para emitir alertas formateadas al usuario ante brechas canario. Depende de CAM (Internet) para consultar bases de vulnerabilidades OSV.dev y reputación AbuseIPDB. Depende de CAM (Bus IPC) para emitir eventos de emergencia Prioridad 1 a Telegram y Ntfy.",
    commands: ["/seguridad", "/bunker", "/escaner_cve"]
  },
  {
    id: "homelab_ops",
    name: "Homelab Ops & Docker Proxy",
    version: "2.0.0",
    category: "critical",
    critical: true,
    author: "Iker (M.E.C.O. Official)",
    desc: "Supervisión de Docker Proxy (:2375), Gobernanza Térmica N100, Uptime Kuma, AdGuard Home DNS, SMART SSD, Restic Backups y Wake-on-LAN.",
    sha256: "039a99da6a1268530ff32dd1080bf4d8e146583c8487b97f59cbd6be40dac126",
    path: "plugins/homelab_ops",
    permissions: ["cam:internet", "core:storage", "system:exec"],
    module_deps: {
      pam: false,
      cam_net: true,
      cam_ipc: false,
      core: ["core:storage", "system:exec"]
    },
    dep_explanation: "Depende de CAM (Internet/Red) para sondear endpoints HTTP de AdGuard Home y Uptime Kuma. No interactúa directamente con el usuario (delega sus respuestas en Telegram o la consola local). Depende de Core (system:exec) para leer sensores de CPU térmicos N100 y SMART SSD.",
    commands: ["/homelab", "/docker", "/temperatura", "/smart"]
  },
  {
    id: "emergency_p2p",
    name: "Emergency P2P Survival Mesh",
    version: "2.0.0",
    category: "critical",
    critical: true,
    author: "Iker (M.E.C.O. Official)",
    desc: "Canal de supervivencia P2P offline con baliza cifrada periódica (0% CPU en espera). Se activa ante corte de fibra óptica o modo búnker.",
    sha256: "fcffa8915715b116822afa28908553a8e8680c5a40312a45f3579c871cf0b50a",
    path: "plugins/emergency_p2p",
    permissions: ["core:admin", "cam:ipc", "cam:internet"],
    module_deps: {
      pam: false,
      cam_net: false,
      cam_ipc: true,
      core: ["core:admin"]
    },
    dep_explanation: "100% Autónomo y Offline ante cortes de red externa. Depende de CAM (Bus IPC) para recibir la señal de desconexión del gestor de red. Despierta un socket UDP de rescate cifrado sin consumir CPU en espera.",
    commands: ["/p2p_mesh", "/baliza"]
  },
  {
    id: "telegram",
    name: "Telegram Gateway & UI",
    version: "2.0.0",
    category: "critical",
    critical: true,
    author: "M.E.C.O. Team",
    desc: "Pasarela soberana interactiva de Telegram, bot polling reactivo, teclados interactivos y gestión de mensajes en tiempo real.",
    sha256: "a81305cf35f3584949dcf7ca4499698c3511127ef2fa8d76f4178a14fe92198e",
    path: "plugins/telegram",
    permissions: ["pam:interact", "cam:internet", "core:admin", "cam:ipc"],
    module_deps: {
      pam: true,
      cam_net: true,
      cam_ipc: true,
      core: ["core:admin"]
    },
    dep_explanation: "Dependencia crítica de PAM: Todo texto enviado por Telegram es procesado y normalizado por el ResponseAdapter de PAM. Depende de CAM (Internet) para el long-polling con la API de Telegram y de CAM (Bus IPC) para recibir notificaciones emitidas por cualquier otro plugin.",
    commands: ["/start", "/ayuda", "/estado", "/menu"]
  },
  {
    id: "sovereign_engine",
    name: "Sovereign Engine & LAN Console",
    version: "2.0.0",
    category: "homelab",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Consola Web Soberana :8899 (https://meco.lab), Cirujano Autónomo de 7 BBDD (SQLite .recover + MariaDB) y Auto-Sanación de Red.",
    sha256: "0ed32309f33c0324095e740804d6bcb0edad9d101447fbaaf95e5d5b84889a4b",
    path: "plugins/sovereign_engine",
    permissions: ["core:admin", "core:storage", "system:exec"],
    module_deps: {
      pam: true,
      cam_net: false,
      cam_ipc: false,
      core: ["core:admin", "core:storage", "system:exec"]
    },
    dep_explanation: "Opera estrictamente en LAN local (:8899) sin depender de salida externa de CAM Internet. Depende de PAM para adaptar las respuestas a las peticiones HTTP lanzadas desde la consola web LAN.",
    commands: ["/reparar_bbdd", "/diagnostico_red"]
  },
  {
    id: "ai_voice_finance",
    name: "AI Voice & Sovereign Finance",
    version: "2.0.0",
    category: "ai",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Oído Neuronal Local faster-whisper (0 tokens), Groq Cloud, Gemini Multimodal, Síntesis Kokoro/Piper, Cashew CSV y Firefly III.",
    sha256: "81f9edafeaeac60bb4df5eb35c8ad7c4289cedbf208c48714a0715fe30b68478",
    path: "plugins/ai_voice_finance",
    permissions: ["pam:interact", "cam:internet", "core:storage"],
    module_deps: {
      pam: true,
      cam_net: true,
      cam_ipc: false,
      core: ["core:storage"]
    },
    dep_explanation: "Depende de PAM para estructurar respuestas conversacionales al usuario. Depende de CAM (Internet) únicamente cuando se delega en APIs en la nube (Groq/Gemini); si se usa faster-whisper local opera sin salida externa.",
    commands: ["/gasto", "/balance", "/nota_voz", "/preguntar_ia"]
  },
  {
    id: "butler_media",
    name: "Butler & Sovereign Media",
    version: "2.0.0",
    category: "media",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Mayordomo Personal, Navidrome con MusicBrainz, Calibre-Web, Immich, RomM Arcade, Notas, Tarifa PVPC REE y Briefing Matutino.",
    sha256: "f52a2e0cf300c2993fc84ff7823b59bdc3a4174b6acfd65963674edcfd2d281c",
    path: "plugins/butler_media",
    permissions: ["cam:internet", "core:storage", "pam:interact"],
    module_deps: {
      pam: true,
      cam_net: true,
      cam_ipc: false,
      core: ["core:storage"]
    },
    dep_explanation: "Depende de PAM para generar briefings amigables y formatear listas de compras. Depende de CAM (Internet) para obtener la tarifa eléctrica horaria de Red Eléctrica de España (PVPC) y metadatos de audio en MusicBrainz.",
    commands: ["/briefing", "/tarifa_luz", "/musica", "/compras"]
  },
  {
    id: "pwa_console",
    name: "PWA Sovereign Console & WebPush",
    version: "2.0.0",
    category: "homelab",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Consola PWA instalable en móviles y PCs con Service Worker, caché offline de interfaz, WebPush API y streaming SSE de telemetría.",
    sha256: "ee8cea9f4305991100783631598add802347686435e0a369d0a6adc6d6471e68",
    path: "plugins/pwa_console",
    permissions: ["core:admin", "pam:interact"],
    module_deps: {
      pam: true,
      cam_net: false,
      cam_ipc: false,
      core: ["core:admin"]
    },
    dep_explanation: "Depende de PAM para adaptar la telemetría en streaming Server-Sent Events (SSE) hacia la Progressive Web App. Funciona en red local sin necesidad de CAM Internet.",
    commands: ["/pwa_link", "/push_token"]
  },
  {
    id: "family_bridge",
    name: "Family Bridge (Bot Mamá Connector)",
    version: "2.0.0",
    category: "network",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Puente de Consentimiento y Control con Bot Mamá (:48900), Aprobación de Transacciones y Gestión Familiar Compartida.",
    sha256: "e35dd8c8d7257218205729731383cbc171a079fb8ab7ea7635de16024abfd986",
    path: "plugins/family_bridge",
    permissions: ["cam:ipc", "pam:interact"],
    module_deps: {
      pam: true,
      cam_net: false,
      cam_ipc: true,
      core: []
    },
    dep_explanation: "Depende de PAM para el lenguaje cercano e interactivo en diálogos familiares. Depende críticamente de CAM (Bus IPC) para coordinar la validación de gastos y transacciones con ai_voice_finance.",
    commands: ["/aprobar_gasto", "/mensaje_familiar"]
  },
  {
    id: "ntfy_gateway",
    name: "Ntfy Push Gateway",
    version: "2.0.0",
    category: "network",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Puente omnicanal de notificaciones push prioritarias mediante Ntfy con botones táctiles interactivos y reintentos offline.",
    sha256: "07818e1fbc68402596ae6b7f62420601df1241e3934ef6e58141ad3d97d410b0",
    path: "plugins/ntfy_gateway",
    permissions: ["cam:internet", "core:events"],
    module_deps: {
      pam: false,
      cam_net: true,
      cam_ipc: true,
      core: ["core:events"]
    },
    dep_explanation: "Depende de CAM (Bus IPC) para escuchar eventos de todos los plugins y de CAM (Internet) para despachar peticiones HTTP POST al servidor Ntfy.",
    commands: ["/notificar", "/test_push"]
  },
  {
    id: "media_arr_ops",
    name: "Media Arr Ops",
    version: "2.1.1",
    category: "media",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Control soberano de descargas *Arr (Sonarr, Radarr, Prowlarr) con diseño sobrio, 0-Virus, 0-Corruptos y 0-Seed.",
    sha256: "d418d3fecba66f821d988ed4b4b9554b3c675cb04ba71d7bfd26e945ac893aba",
    path: "plugins/media_arr_ops",
    permissions: ["cam:internet", "system:exec"],
    module_deps: {
      pam: false,
      cam_net: true,
      cam_ipc: false,
      core: ["system:exec"]
    },
    dep_explanation: "Depende de CAM (Internet / Red) para comunicarse con las APIs REST de los servicios Sonarr, Radarr y clientes de torrents.",
    commands: ["/descargas", "/buscar_peli", "/limpiar_arr"]
  },
  {
    id: "mesh_vpn_controller",
    name: "Mesh VPN Controller",
    version: "2.0.0",
    category: "network",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Controlador de red privada en malla WireGuard y Tailscale para auditar y gestionar accesos de dispositivos remotos.",
    sha256: "3ee9f913f535f4dc211979f30e0b8f2b8694ddbda8689c77bd99bc0025b29e9a",
    path: "plugins/mesh_vpn_controller",
    permissions: ["system:exec", "core:admin"],
    module_deps: {
      pam: false,
      cam_net: false,
      cam_ipc: false,
      core: ["system:exec", "core:admin"]
    },
    dep_explanation: "Controlador de bajo nivel. No requiere módulos PAM ni CAM: interactúa directamente con el kernel de Linux (wg, tailscale status) mediante system:exec del Core.",
    commands: ["/vpn_status", "/peers", "/bloquear_peer"]
  },
  {
    id: "smarthome_bridge",
    name: "SmartHome Bridge",
    version: "2.0.0",
    category: "homelab",
    critical: false,
    author: "Iker (M.E.C.O. Official)",
    desc: "Puente de comunicación bidireccional local con Home Assistant, Zigbee2MQTT o dispositivos IoT locales.",
    sha256: "5c4b7b181bf8cbf6a190f0491c01916fb213319d0c035ec48d74de2e623d10f7",
    path: "plugins/smarthome_bridge",
    permissions: ["cam:internet", "cam:ipc"],
    module_deps: {
      pam: false,
      cam_net: true,
      cam_ipc: true,
      core: []
    },
    dep_explanation: "Depende de CAM (Red/Internet) para dialogar con Home Assistant y de CAM (Bus IPC) para propagar estados domóticos a otros módulos.",
    commands: ["/luces", "/clima", "/automatizaciones"]
  },
  {
    id: "phoenix_cloud_sync",
    name: "Phoenix Cloud Sync (rclone)",
    version: "2.0.0",
    category: "homelab",
    critical: false,
    author: "M.E.C.O. Community",
    desc: "Sube automáticamente la cápsula Fénix (meco_phoenix_bundle.tar.gz) a la nube utilizando rclone para recuperación total.",
    sha256: "2c3c79cba5fcd9994e0af00e436a206b59117e93b91c3d042f170c39d68a7908",
    path: "plugins/phoenix_cloud_sync",
    permissions: ["system:exec", "core:storage"],
    module_deps: {
      pam: false,
      cam_net: true,
      cam_ipc: false,
      core: ["system:exec", "core:storage"]
    },
    dep_explanation: "Depende de CAM (Internet) para la sincronización con almacenamiento cloud (Google Drive, S3, Dropbox) y de Core (system:exec) para lanzar el binario rclone.",
    commands: ["/fenix_backup", "/sincronizar_nube"]
  }
];

// ==============================================================================
// 3. TREE SVG RENDERER (EL GRÁFICO DE RAMAS)
// ==============================================================================
let activeSelectedNodeId = "root";

function renderBranchTree(filterTier = "all") {
  const svg = document.getElementById("branchSvg");
  if (!svg) return;

  // Clear SVG
  svg.innerHTML = `
    <defs>
      <!-- Gradients for branch lines -->
      <linearGradient id="gradTier1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="gradTier2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="gradTier3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.9"/>
      </linearGradient>
      
      <!-- Sub-branch gradients -->
      <linearGradient id="gradSub1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="gradSub2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="gradSub3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
  `;

  // Layout Coordinates: Horizontal tree layout
  // Column 1: Root (X: 30, Y: 260)
  // Column 2: Tiers (X: 250) -> Tier 1 (Y: 90), Tier 2 (Y: 260), Tier 3 (Y: 430)
  // Column 3: Subnodes (X: 520)
  const coords = {
    root: { x: 20, y: 220, w: 170, h: 65 },
    
    // Tier nodes
    tier1: { x: 250, y: 80, w: 180, h: 60 },
    tier2: { x: 250, y: 225, w: 180, h: 60 },
    tier3: { x: 250, y: 370, w: 180, h: 60 },
    
    // Tier 1 children
    core_perms:     { x: 500, y: 30,  w: 190, h: 42 },
    core_schematic: { x: 500, y: 80,  w: 190, h: 42 },
    core_loader:    { x: 500, y: 130, w: 190, h: 42 },
    core_state:     { x: 500, y: 180, w: 190, h: 42 },
    
    // Tier 2 children
    pam_adapter:     { x: 500, y: 235, w: 190, h: 42 },
    pam_interaction: { x: 500, y: 285, w: 190, h: 42 },
    cam_network:     { x: 500, y: 335, w: 190, h: 42 },
    cam_ipc:         { x: 500, y: 385, w: 190, h: 42 },
    
    // Tier 3 children
    hub_security:    { x: 500, y: 440, w: 190, h: 42 },
    hub_homelab:     { x: 500, y: 490, w: 190, h: 42 },
    hub_emergency:   { x: 500, y: 540, w: 190, h: 42 },
    hub_telegram:    { x: 500, y: 590, w: 190, h: 42 }
  };

  // Branch Links to Draw
  const links = [
    // Root to Tiers
    { from: "root", to: "tier1", grad: "url(#gradTier1)", tier: 1 },
    { from: "root", to: "tier2", grad: "url(#gradTier2)", tier: 2 },
    { from: "root", to: "tier3", grad: "url(#gradTier3)", tier: 3 },
    
    // Tier 1 to children
    { from: "tier1", to: "core_perms", grad: "url(#gradSub1)", tier: 1 },
    { from: "tier1", to: "core_schematic", grad: "url(#gradSub1)", tier: 1 },
    { from: "tier1", to: "core_loader", grad: "url(#gradSub1)", tier: 1 },
    { from: "tier1", to: "core_state", grad: "url(#gradSub1)", tier: 1 },
    
    // Tier 2 to children
    { from: "tier2", to: "pam_adapter", grad: "url(#gradSub2)", tier: 2 },
    { from: "tier2", to: "pam_interaction", grad: "url(#gradSub2)", tier: 2 },
    { from: "tier2", to: "cam_network", grad: "url(#gradSub2)", tier: 2 },
    { from: "tier2", to: "cam_ipc", grad: "url(#gradSub2)", tier: 2 },
    
    // Tier 3 to children
    { from: "tier3", to: "hub_security", grad: "url(#gradSub3)", tier: 3 },
    { from: "tier3", to: "hub_homelab", grad: "url(#gradSub3)", tier: 3 },
    { from: "tier3", to: "hub_emergency", grad: "url(#gradSub3)", tier: 3 },
    { from: "tier3", to: "hub_telegram", grad: "url(#gradSub3)", tier: 3 }
  ];

  // Draw Links
  links.forEach(link => {
    if (filterTier !== "all" && link.tier.toString() !== filterTier) return;

    const fromPt = coords[link.from];
    const toPt = coords[link.to];
    if (!fromPt || !toPt) return;

    const startX = fromPt.x + fromPt.w;
    const startY = fromPt.y + fromPt.h / 2;
    const endX = toPt.x;
    const endY = toPt.y + toPt.h / 2;

    const midX = startX + (endX - startX) * 0.55;

    const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    
    const isRelated = (activeSelectedNodeId === link.from || activeSelectedNodeId === link.to);

    const pathElem = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElem.setAttribute("d", pathData);
    pathElem.setAttribute("class", `svg-branch-link ${isRelated ? "active-link" : ""}`);
    pathElem.setAttribute("stroke", link.grad);
    svg.appendChild(pathElem);
  });

  // Draw Nodes
  Object.keys(coords).forEach(nodeId => {
    const nodeData = MECO_BRANCH_DATA[nodeId];
    if (!nodeData) return;

    if (filterTier !== "all" && nodeData.tier !== 0 && nodeData.tier.toString() !== filterTier) {
      return;
    }

    const pos = coords[nodeId];
    const isSelected = activeSelectedNodeId === nodeId;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "svg-node-group");
    group.setAttribute("id", `node-${nodeId}`);

    // Color definitions
    let strokeColor = "rgba(255, 255, 255, 0.18)";
    let fillColor = "#0e1422";
    if (nodeData.tier === 0) strokeColor = "#94a3b8";
    if (nodeData.tier === 1) strokeColor = "#38bdf8";
    if (nodeData.tier === 2) strokeColor = "#2dd4bf";
    if (nodeData.tier === 3) strokeColor = "#a78bfa";

    if (isSelected) {
      fillColor = "#1a253a";
    }

    // Node Box
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", pos.x);
    rect.setAttribute("y", pos.y);
    rect.setAttribute("width", pos.w);
    rect.setAttribute("height", pos.h);
    rect.setAttribute("class", "svg-node-rect");
    rect.setAttribute("fill", fillColor);
    rect.setAttribute("stroke", strokeColor);
    rect.setAttribute("stroke-width", isSelected ? "2.5" : "1.5");
    group.appendChild(rect);

    // Indicator Dot
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", pos.x + 14);
    circle.setAttribute("cy", pos.y + (pos.h > 50 ? 22 : pos.h / 2));
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", strokeColor);
    group.appendChild(circle);

    // Title Text
    const textTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textTitle.setAttribute("x", pos.x + 26);
    textTitle.setAttribute("y", pos.y + (pos.h > 50 ? 25 : pos.h / 2 - 2));
    textTitle.setAttribute("class", "svg-node-title");
    textTitle.textContent = nodeData.title;
    group.appendChild(textTitle);

    // Subtitle Text (if height > 50 or present)
    if (pos.h > 45 && nodeData.subtitle) {
      const textSub = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textSub.setAttribute("x", pos.x + 26);
      textSub.setAttribute("y", pos.y + 44);
      textSub.setAttribute("class", "svg-node-subtitle");
      textSub.textContent = nodeData.subtitle;
      group.appendChild(textSub);
    } else if (nodeData.subtitle) {
      const textSub = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textSub.setAttribute("x", pos.x + 26);
      textSub.setAttribute("y", pos.y + pos.h / 2 + 11);
      textSub.setAttribute("class", "svg-node-subtitle");
      textSub.textContent = nodeData.subtitle;
      group.appendChild(textSub);
    }

    // Click handler to select node
    group.addEventListener("click", () => {
      selectBranchNode(nodeId);
    });

    svg.appendChild(group);
  });
}

function selectBranchNode(nodeId) {
  activeSelectedNodeId = nodeId;
  const node = MECO_BRANCH_DATA[nodeId];
  if (!node) return;

  // Update Inspector elements
  const inspector = document.getElementById("treeInspector");
  if (!inspector) return;

  const badgeElem = document.getElementById("inspBadge");
  const titleElem = document.getElementById("inspTitle");
  const pathElem = document.getElementById("inspPath");
  const descElem = document.getElementById("inspDesc");
  const specsElem = document.getElementById("inspSpecs");
  const codeElem = document.getElementById("inspCode");

  if (badgeElem) {
    badgeElem.textContent = node.badge;
    badgeElem.className = `inspector-tier-badge badge-tier${node.tier || 1}`;
  }
  if (titleElem) titleElem.textContent = node.title;
  if (pathElem) pathElem.textContent = node.path;
  if (descElem) descElem.textContent = node.desc;
  if (codeElem) codeElem.textContent = node.code;

  if (specsElem && node.specs) {
    specsElem.innerHTML = Object.entries(node.specs).map(([key, val]) => `
      <div class="spec-row">
        <span class="spec-key">${key}</span>
        <span class="spec-val">${val}</span>
      </div>
    `).join("");
  }

  // Redraw links to highlight active selection
  const currentFilter = document.querySelector(".filter-btn.active")?.dataset.tier || "all";
  renderBranchTree(currentFilter);
}

// ==============================================================================
// 4. LIVE SIMULATOR: MOTOR DE ADAPTACIÓN PAM & MODO ESQUEMÁTICO CORE
// ==============================================================================
let activeSimulatorProfile = "conversational"; // conversational, concise, technical, schematic

const SIMULATED_DATA = {
  status: {
    title: "Estado General del Sistema",
    raw: {
      microkernel: "M.E.C.O. v3.0.0 (Nominal)",
      uptime: "14 días, 8 horas, 22 minutos",
      active_plugins: "14 cargados sin errores",
      circuit_breakers: "14 CLOSED (0 fallos)",
      memory_rss_mb: "52.4 MB (Autovacuna activa)",
      docker_containers: "18 Up (0 Unhealthy)",
      intel_n100_temp: "39.5°C",
      network_mode: "LAN / Internet Online"
    }
  },
  seguridad: {
    title: "Escudo Canario y FIM",
    raw: {
      canary_shield: "ACTIVO (inotify <50ms en /shared/canary)",
      fim_integrity: "100% Verificado (Línea base SHA-256 coincidente)",
      arp_radar: "7 dispositivos autorizados en LAN",
      bunker_mode: "DESACTIVADO (SMB disponible)"
    }
  },
  homelab: {
    title: "Telemetría Homelab Intel N100",
    raw: {
      cpu_temp: "39.5°C (Gobernanza activa)",
      load_avg: "0.24, 0.31, 0.28",
      docker_proxy: "Escuchando en :2375",
      smart_ssd: "NVMe 1TB - 100% Salud (32°C)",
      adguard_dns: "42,190 consultas bloqueadas (24h)"
    }
  },
  ayuda: {
    title: "Directorio de Comandos M.E.C.O.",
    raw: {
      "/estado": "Consulta estado general adaptado por PAM",
      "/seguridad": "Reporte de integridad SHA-256 y escudo canario",
      "/homelab": "Métricas Docker, CPU N100 y SMART SSD",
      "/offline": "Simula corte de fibra y activación P2P táctica",
      "/modo [conversational|concise|technical|schematic]": "Cambia perfil PAM"
    }
  }
};

function formatSimulatorOutput(payload, profile = activeSimulatorProfile, cmd = "/estado") {
  // 1. Modo Esquemático Básico (Nivel 1 Core)
  if (profile === "schematic") {
    let lines = [
      `[MECO:SCHEMATIC] SRC=CORE | STATUS=OK`,
      `[META] command=${cmd} | profile=schematic | timestamp=${Date.now()}`
    ];
    Object.entries(payload.raw).forEach(([k, v]) => {
      lines.push(`  ${k}: ${v}`);
    });
    return {
      text: lines.join("\n"),
      isSchematic: true
    };
  }

  // 2. Modo Conciso (Nivel 2 PAM)
  if (profile === "concise") {
    const compactPairs = Object.entries(payload.raw)
      .slice(0, 4)
      .map(([k, v]) => `${k}=${v}`)
      .join(" | ");
    return {
      text: `OK: ${compactPairs}`,
      isSchematic: false
    };
  }

  // 3. Modo Técnico (Nivel 2 PAM)
  if (profile === "technical") {
    const header = `[PAM:ADAPTER | src=core.kernel | style=technical | ch=local]`;
    const details = Object.entries(payload.raw)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");
    return {
      text: `${header}\n${details}`,
      isSchematic: false
    };
  }

  // 4. Modo Conversacional (Nivel 2 PAM - Por defecto)
  let text = `🛡️ ${payload.title}:\n`;
  Object.entries(payload.raw).forEach(([k, v]) => {
    text += `• ${k.replace(/_/g, " ")}: ${v}\n`;
  });
  text += `\nTodo opera en rangos óptimos bajo la supervisión del microkernel.`;
  return {
    text: text.trim(),
    isSchematic: false
  };
}

function runSimulatorCommand(rawCmd) {
  const terminalBody = document.getElementById("terminalBody");
  if (!terminalBody) return;

  const cmd = rawCmd.trim();
  if (!cmd) return;

  // Add User Command Line
  const promptLine = document.createElement("div");
  promptLine.className = "terminal-prompt-line";
  promptLine.innerHTML = `<span style="color:#2dd4bf">iker@homelab:~$</span> <span class="user-prompt">${escapeHtml(cmd)}</span>`;
  terminalBody.appendChild(promptLine);

  // Command logic
  let outputResult = null;

  if (cmd.startsWith("/modo ")) {
    const newStyle = cmd.replace("/modo ", "").trim().toLowerCase();
    if (["conversational", "concise", "technical", "schematic"].includes(newStyle)) {
      setSimulatorProfile(newStyle);
      outputResult = {
        text: `[PAM] Perfil de adaptación actualizado a '${newStyle}'. Las próximas respuestas usarán este formato.`,
        isSchematic: newStyle === "schematic"
      };
    } else {
      outputResult = {
        text: `[PAM:ERROR] Estilo '${newStyle}' desconocido. Opciones: conversational, concise, technical, schematic.`,
        isSchematic: false
      };
    }
  } else if (cmd === "/schematic" || cmd.includes("--schematic")) {
    outputResult = formatSimulatorOutput(SIMULATED_DATA.status, "schematic", cmd);
  } else if (cmd === "/estado") {
    outputResult = formatSimulatorOutput(SIMULATED_DATA.status, activeSimulatorProfile, cmd);
  } else if (cmd === "/seguridad") {
    outputResult = formatSimulatorOutput(SIMULATED_DATA.seguridad, activeSimulatorProfile, cmd);
  } else if (cmd === "/homelab" || cmd === "/temperatura" || cmd === "/docker") {
    outputResult = formatSimulatorOutput(SIMULATED_DATA.homelab, activeSimulatorProfile, cmd);
  } else if (cmd === "/offline") {
    outputResult = {
      text: `[CAM:NETWORK] ¡Simulación de corte de fibra activada!\n• offline_mode: True (Bloqueo estricto de fuga de paquetes)\n• emergency_p2p: Socket UDP táctico levantado en 0% CPU\n• Sistema en autosuficiencia local y malla P2P de rescate.`,
      isSchematic: activeSimulatorProfile === "schematic"
    };
  } else if (cmd === "/ayuda" || cmd === "help") {
    outputResult = formatSimulatorOutput(SIMULATED_DATA.ayuda, activeSimulatorProfile, cmd);
  } else if (cmd === "clear") {
    terminalBody.innerHTML = "";
    return;
  } else {
    outputResult = {
      text: `[PAM] Comando '${cmd}' no reconocido. Prueba /estado, /seguridad, /homelab, /offline o /ayuda.`,
      isSchematic: false
    };
  }

  // Append Output
  const outputElem = document.createElement("div");
  outputElem.className = `terminal-output ${outputResult.isSchematic ? "schematic" : ""}`;
  outputElem.textContent = outputResult.text;
  terminalBody.appendChild(outputElem);

  // Scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function setSimulatorProfile(profile) {
  activeSimulatorProfile = profile;
  document.querySelectorAll(".mode-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.style === profile);
  });
}

// ==============================================================================
// 5. PLUGINS CATALOG RENDERER & SEARCH
// ==============================================================================
function renderPlugins(category = "all", searchTerm = "") {
  const grid = document.getElementById("pluginsGrid");
  if (!grid) return;

  const filtered = MECO_PLUGINS.filter(p => {
    const matchesCat = (category === "all") || (p.category === category) || (category === "critical" && p.critical);
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || 
      p.name.toLowerCase().includes(term) || 
      p.desc.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-dim);">
      No se encontraron plugins con ese criterio de búsqueda.
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="plugin-card" data-plugin-id="${p.id}">
      <div class="plugin-header">
        <h3 class="plugin-name">${p.name}</h3>
        <span class="plugin-badge-pill ${p.critical ? 'pill-critical' : 'pill-official'}">
          ${p.critical ? 'Crítico' : 'Oficial'}
        </span>
      </div>
      
      <!-- Etiquetas de Dependencias de Módulos Nativos -->
      <div class="plugin-deps-row">
        ${p.module_deps.pam ? '<span class="dep-tag dep-tag-pam">Módulo PAM</span>' : ''}
        ${p.module_deps.cam_net ? '<span class="dep-tag dep-tag-cam-net">CAM: Internet</span>' : ''}
        ${p.module_deps.cam_ipc ? '<span class="dep-tag dep-tag-cam-ipc">CAM: Bus IPC</span>' : ''}
        ${(!p.module_deps.pam && !p.module_deps.cam_net && !p.module_deps.cam_ipc) ? '<span class="dep-tag dep-tag-local">100% Autónomo / Local</span>' : ''}
      </div>

      <p class="plugin-desc">${p.desc}</p>
      <div class="plugin-footer">
        <span class="plugin-meta">v${p.version} • ${p.commands.length} comandos</span>
        <button class="plugin-btn-inspect" onclick="openPluginModal('${p.id}')">
          Inspeccionar &rarr;
        </button>
      </div>
    </div>
  `).join("");
}

function openPluginModal(pluginId) {
  const p = MECO_PLUGINS.find(item => item.id === pluginId);
  if (!p) return;

  const modalOverlay = document.getElementById("pluginModal");
  if (!modalOverlay) return;

  document.getElementById("modalPluginTitle").textContent = p.name;
  document.getElementById("modalPluginBadge").textContent = p.critical ? "Plugin Crítico" : "Plugin Oficial";
  document.getElementById("modalPluginBadge").className = `plugin-badge-pill ${p.critical ? 'pill-critical' : 'pill-official'}`;
  document.getElementById("modalPluginDesc").textContent = p.desc;
  
  document.getElementById("modalPluginSha").textContent = p.sha256;
  document.getElementById("modalPluginPath").textContent = p.path;
  document.getElementById("modalPluginAuthor").textContent = p.author;
  
  // Dependencia de módulos nativos
  const depBox = document.getElementById("modalPluginDepExplanation");
  if (depBox) {
    depBox.textContent = p.dep_explanation || "No declara dependencias de módulos nativos.";
  }

  // Permissions chips
  const permsBox = document.getElementById("modalPluginPerms");
  permsBox.innerHTML = p.permissions.map(perm => `<span class="cmd-badge">${perm}</span>`).join(" ");

  // Commands
  const cmdsBox = document.getElementById("modalPluginCommands");
  cmdsBox.innerHTML = p.commands.map(cmd => `<span class="cmd-badge" style="color:var(--accent-modules)">${cmd}</span>`).join(" ");

  modalOverlay.classList.add("active");
}

function closePluginModal() {
  const modalOverlay = document.getElementById("pluginModal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }
}

// Renderizar Matriz de Dependencias
function renderMatrixTable() {
  const tbody = document.getElementById("matrixTableBody");
  if (!tbody) return;

  tbody.innerHTML = MECO_PLUGINS.map(p => `
    <tr>
      <td>
        <strong style="color:var(--text-main)">${p.name}</strong><br>
        <code style="font-size:0.75rem; color:var(--text-dim)">${p.path}</code>
      </td>
      <td>
        <span class="plugin-badge-pill ${p.critical ? 'pill-critical' : 'pill-official'}">
          ${p.critical ? 'Crítico' : 'Oficial'}
        </span>
      </td>
      <td style="text-align: center;">
        ${p.module_deps.pam ? '<span class="matrix-check" title="Depende de PAM para adaptar respuestas">✓</span>' : '<span class="matrix-cross">—</span>'}
      </td>
      <td style="text-align: center;">
        ${p.module_deps.cam_net ? '<span class="matrix-check" title="Depende de CAM para peticiones HTTP">✓</span>' : '<span class="matrix-cross">—</span>'}
      </td>
      <td style="text-align: center;">
        ${p.module_deps.cam_ipc ? '<span class="matrix-check" title="Depende de CAM para Bus IPC">✓</span>' : '<span class="matrix-cross">—</span>'}
      </td>
      <td>
        <code style="font-size:0.75rem">${p.module_deps.core.join(', ') || 'Ninguno'}</code>
      </td>
    </tr>
  `).join("");
}

// ==============================================================================
// 6. INITIALIZATION & EVENT LISTENERS
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Tree Render
  renderBranchTree("all");
  selectBranchNode("root");

  // Filter buttons for Tree
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderBranchTree(btn.dataset.tier);
    });
  });

  // 2. Terminal Simulator Listeners
  document.querySelectorAll(".mode-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      setSimulatorProfile(pill.dataset.style);
      runSimulatorCommand("/estado");
    });
  });

  document.querySelectorAll(".cmd-badge[data-cmd]").forEach(badge => {
    badge.addEventListener("click", () => {
      runSimulatorCommand(badge.dataset.cmd);
    });
  });

  // 3. Plugins Catalog Filters, Search & Dependency Matrix
  renderPlugins("all", "");
  renderMatrixTable();

  document.querySelectorAll(".chip[data-category]").forEach(chip => {
    if (chip.id === "btnToggleMatrix") return; // Handled separately
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => {
        if (c.id !== "btnToggleMatrix") c.classList.remove("active");
      });
      chip.classList.add("active");
      const searchVal = document.getElementById("pluginSearch")?.value || "";
      renderPlugins(chip.dataset.category, searchVal);
    });
  });

  // Toggle Matrix Button
  const btnToggleMatrix = document.getElementById("btnToggleMatrix");
  const matrixContainer = document.getElementById("matrixContainer");
  if (btnToggleMatrix && matrixContainer) {
    btnToggleMatrix.addEventListener("click", () => {
      const isHidden = matrixContainer.style.display === "none";
      matrixContainer.style.display = isHidden ? "block" : "none";
      btnToggleMatrix.classList.toggle("active", isHidden);
      btnToggleMatrix.textContent = isHidden ? "✕ Ocultar Matriz de Dependencias" : "📊 Ver Matriz de Dependencias";
      if (isHidden) {
        matrixContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  const searchInput = document.getElementById("pluginSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeCat = document.querySelector(".chip.active")?.dataset.category || "all";
      renderPlugins(activeCat, e.target.value);
    });
  }

  // 4. Quickstart Tab Switching
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.dataset.tab;
      document.getElementById(targetId)?.classList.add("active");
    });
  });

  // 5. Copy Buttons
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.dataset.copyTarget;
      const targetElem = document.querySelector(targetSelector);
      if (targetElem) {
        navigator.clipboard.writeText(targetElem.textContent.trim()).then(() => {
          const original = btn.textContent;
          btn.textContent = "¡Copiado!";
          setTimeout(() => { btn.textContent = original; }, 1800);
        });
      }
    });
  });

  // 6. Modal close on outside click or ESC
  const modalOverlay = document.getElementById("pluginModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closePluginModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePluginModal();
  });

  // Run initial terminal intro
  setTimeout(() => {
    runSimulatorCommand("/estado");
  }, 400);
});

// Helper utilities
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
