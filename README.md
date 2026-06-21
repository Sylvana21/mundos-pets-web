# Mundogs & Pets — Sitio web con agenda de citas

Este es el sitio completo de tu estética: información del negocio, servicios,
paquetes, ubicación y un formulario para que tus clientes agenden citas en
línea. También incluye un panel privado (`/admin`) para que tú veas y
administres las citas que van llegando.

Por ahora, si abres el sitio sin configurar nada, las citas se guardan solo
en el navegador de quien agenda (modo de prueba). Para que **todas las citas
de todos los clientes lleguen a un solo lugar que tú puedas ver**, necesitas
conectar una base de datos gratuita (Supabase) y publicar el sitio (Vercel).
Son dos pasos, ambos gratis y sin tarjeta de crédito para este tamaño de
negocio.

---

## Paso 1 — Crear la base de datos (Supabase)

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratis.
2. Crea un **nuevo proyecto** (te pedirá un nombre y una contraseña para la
   base de datos — guarda esa contraseña en algún lugar seguro, no la
   necesitarás seguido pero es bueno tenerla).
3. Espera 1-2 minutos a que el proyecto termine de crearse.
4. En el menú izquierdo, ve a **SQL Editor**.
5. Abre el archivo `supabase_schema.sql` que te entregué, copia **todo** su
   contenido, pégalo en el editor y dale clic a **Run**. Esto crea la tabla
   donde se guardarán las citas.
6. Ve a **Settings → API** (en el menú izquierdo).
7. Copia dos datos que vas a necesitar en el siguiente paso:
   - **Project URL**
   - **anon public key** (la clave pública, NO la "service_role")

---

## Paso 2 — Publicar el sitio (Vercel)

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta gratis (puedes
   entrar con tu cuenta de GitHub, Google, etc.).
2. Necesitas subir esta carpeta del proyecto a GitHub primero:
   - Crea una cuenta en [github.com](https://github.com) si no tienes.
   - Crea un repositorio nuevo (por ejemplo `mundogs-pets-web`).
   - Sube el contenido de la carpeta `app/` a ese repositorio (Github te deja
     arrastrar y soltar los archivos desde su web si no usas línea de
     comandos).
3. En Vercel, dale clic a **Add New → Project**, y selecciona el repositorio
   que acabas de subir.
4. Antes de darle a "Deploy", abre la sección **Environment Variables** y
   agrega estas dos:
   - `VITE_SUPABASE_URL` → pega aquí el **Project URL** que copiaste de Supabase
   - `VITE_SUPABASE_ANON_KEY` → pega aquí el **anon public key**
5. Dale clic a **Deploy**. En 1-2 minutos tu sitio estará en línea con una
   dirección tipo `mundogs-pets-web.vercel.app`.
6. (Opcional) En Vercel puedes conectar un dominio propio como
   `mundogspets.com` si más adelante lo compras.

¡Listo! A partir de ahí, cada vez que un cliente agende, la cita se guarda en
Supabase y tú la puedes ver entrando a:

```
https://tu-sitio.vercel.app/admin
```

La clave de acceso al panel viene preconfigurada como `mundogs2026` — te
recomiendo cambiarla. Está en el archivo:
`src/pages/Admin.tsx`, en la línea que dice `ADMIN_PASSWORD`.

---

## ¿Cómo edito la información del negocio?

Casi todo (horarios, dirección, WhatsApp, Instagram, servicios, precios,
paquetes) está en un solo archivo, fácil de editar sin tocar el resto del
código:

```
src/lib/business.ts
```

Si cambias algo ahí, solo necesitas volver a subir los cambios a GitHub y
Vercel actualiza el sitio solo, automáticamente.

---

## ¿Cómo pruebo el sitio en mi computadora antes de publicar?

Si tienes Node.js instalado:

```bash
cd app
npm install
npm run dev
```

Y abre el link que te muestre en la terminal (normalmente
`http://localhost:5173`).

---

## ¿Qué pasa si no configuro Supabase?

El sitio sigue funcionando y se ve igual, pero las citas solo se guardan en
el navegador de la persona que agenda (no las verás tú). Es útil para
mostrar el sitio o probarlo, pero para recibir citas reales de tus clientes
necesitas hacer el Paso 1.
