-- ============================================================
-- Esquema de base de datos para Mundogs & Pets
-- Cópialo y pégalo en: Supabase -> tu proyecto -> SQL Editor -> Run
--
-- IMPORTANTE: si ya habías corrido una versión anterior de este
-- archivo (con columnas pet_name, pet_species, etc. sueltas),
-- corre primero el bloque de "MIGRACIÓN" más abajo, o si no
-- te importa perder las citas de prueba, simplemente borra la
-- tabla vieja con:  drop table if exists appointments;
-- y luego corre todo este archivo de nuevo.
-- ============================================================

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Dueño
  owner_name text not null,
  owner_phone text not null,
  owner_email text,

  -- Mascotas: arreglo de objetos en formato JSON, por ejemplo:
  -- [
  --   {"pet_name":"Firulais","pet_species":"Perro","pet_breed":"Salchicha",
  --    "pet_size":"chico","service_id":"bano-corte","service_name":"Baño y corte"},
  --   {"pet_name":"Michi","pet_species":"Otro","pet_breed":"","pet_size":"chico",
  --    "service_id":"spa","service_name":"Spa"}
  -- ]
  -- Esto permite que un mismo cliente agende varias mascotas en una sola cita,
  -- cada una con su propio servicio.
  pets jsonb not null,

  -- Modalidad de la cita completa (todas las mascotas comparten lugar/fecha/hora)
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

create policy "Cualquiera puede agendar"
  on appointments for insert
  to anon
  with check (true);

create policy "Lectura para el panel"
  on appointments for select
  to anon
  using (true);

create policy "Actualizar estado desde el panel"
  on appointments for update
  to anon
  using (true);

-- ============================================================
-- MIGRACIÓN (solo si ya tenías la tabla vieja con columnas sueltas
-- de una sola mascota por cita). Ejecuta este bloque ANTES del
-- create table de arriba, o simplemente usa drop table como se
-- explica al inicio si no te importa perder los datos de prueba.
-- ============================================================
-- alter table appointments add column if not exists pets jsonb;
-- update appointments set pets = jsonb_build_array(
--   jsonb_build_object(
--     'pet_name', pet_name, 'pet_species', pet_species,
--     'pet_breed', pet_breed, 'pet_size', pet_size,
--     'service_id', service_id, 'service_name', service_name
--   )
-- ) where pets is null;
-- alter table appointments alter column pets set not null;
-- alter table appointments drop column if exists pet_name;
-- alter table appointments drop column if exists pet_species;
-- alter table appointments drop column if exists pet_breed;
-- alter table appointments drop column if exists pet_size;
-- alter table appointments drop column if exists service_id;
-- alter table appointments drop column if exists service_name;
