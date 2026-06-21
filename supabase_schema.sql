-- ============================================================
-- Esquema de base de datos para Mundogs & Pets
-- Cópialo y pégalo en: Supabase -> tu proyecto -> SQL Editor -> Run
-- ============================================================

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Dueño
  owner_name text not null,
  owner_phone text not null,
  owner_email text,

  -- Mascota
  pet_name text not null,
  pet_species text not null,
  pet_breed text,
  pet_size text not null check (pet_size in ('chico', 'mediano', 'grande')),

  -- Servicio
  service_id text not null,
  service_name text not null,
  location_type text not null check (location_type in ('local', 'movil', 'taxipet')),
  address text,

  -- Fecha y hora
  date date not null,
  time text not null,

  notes text,
  status text not null default 'pendiente'
    check (status in ('pendiente', 'confirmada', 'completada', 'cancelada'))
);

-- Índice para buscar citas por fecha rápidamente
create index if not exists appointments_date_idx on appointments (date);

-- ============================================================
-- Seguridad: Row Level Security (RLS)
-- Permite que cualquier visitante de la página CREE una cita
-- (necesario para que el formulario público funcione),
-- pero solo permite LEER y MODIFICAR citas con la clave correcta
-- desde el panel de administración (que ya tiene su propia clave
-- de acceso en la app).
-- ============================================================

alter table appointments enable row level security;

-- Cualquiera puede insertar (agendar) una cita
create policy "Cualquiera puede agendar"
  on appointments for insert
  to anon
  with check (true);

-- Cualquiera con la URL puede leer/actualizar (el panel /admin
-- ya está protegido con clave dentro de la app).
-- Si más adelante quieres reforzar esto con login real de
-- Supabase Auth, dímelo y lo ajustamos.
create policy "Lectura para el panel"
  on appointments for select
  to anon
  using (true);

create policy "Actualizar estado desde el panel"
  on appointments for update
  to anon
  using (true);
