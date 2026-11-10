-- Users
create table if not exists app_user (
  id uuid primary key,
  email varchar(320) not null unique,
  full_name varchar(200) not null,
  password_hash varchar(255) not null,
  role varchar(30) not null,
  created_at timestamptz not null default now()
);

-- Products (Servicios)
create table if not exists product (
  id uuid primary key,
  slug varchar(120) not null unique,
  name varchar(160) not null,
  short_description varchar(260) not null,
  description text not null,
  image_url text null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Portfolio (Modelos / Proyectos)
create table if not exists portfolio_item (
  id uuid primary key,
  title varchar(180) not null,
  category varchar(80) not null,
  description text not null,
  image_url text null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Contact requests
create table if not exists contact_request (
  id uuid primary key,
  full_name varchar(200) not null,
  phone varchar(40) not null,
  email varchar(320) not null,
  project_type varchar(120) not null,
  description text not null,
  privacy_accepted boolean not null,
  created_at timestamptz not null default now()
);

-- Orders (Venta online - MVP)
create table if not exists customer_order (
  id uuid primary key,
  customer_email varchar(320) not null,
  customer_name varchar(200) not null,
  customer_phone varchar(40) null,
  status varchar(40) not null,
  created_at timestamptz not null default now()
);

create table if not exists order_item (
  id uuid primary key,
  order_id uuid not null references customer_order(id) on delete cascade,
  product_id uuid not null references product(id),
  quantity int not null,
  unit_price_cents int not null,
  created_at timestamptz not null default now()
);

-- Seed (safe, minimal)
insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
values
  ('11111111-1111-1111-1111-111111111111', 'cierres-metalicos', 'Cierres Metálicos', 'Cierres enrollables para locales comerciales.', 'Instalación y reparación de cierres metálicos con materiales certificados.', null, true, 10),
  ('11111111-1111-1111-1111-111111111112', 'puertas-acorazadas', 'Puertas Acorazadas', 'Puertas de seguridad de alta gama.', 'Asesoramiento, instalación y mantenimiento de puertas acorazadas.', null, true, 20),
  ('11111111-1111-1111-1111-111111111113', 'aluminio-tecnico', 'Carpintería de Aluminio', 'Sistemas avanzados para proyectos técnicos.', 'Ventanas, puertas y cerramientos de aluminio para residencial e industrial.', null, true, 30)
on conflict do nothing;

insert into portfolio_item (id, title, category, description, image_url, active, sort_order)
values
  ('22222222-2222-2222-2222-222222222221', 'Fachada Comercial', 'Comercial', 'Fachada con perfiles de aluminio y vidrio de seguridad.', null, true, 10),
  ('22222222-2222-2222-2222-222222222222', 'Cerramiento Residencial', 'Residencial', 'Cerramiento térmico con rotura de puente térmico.', null, true, 20)
on conflict do nothing;
