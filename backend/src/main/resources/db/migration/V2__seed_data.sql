-- Idempotent seed to ensure demo data exists even if V1 ran before edits.

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '11111111-1111-1111-1111-111111111111'::uuid,
  'cierres-metalicos',
  'Cierres Metálicos',
  'Cierres enrollables para locales comerciales.',
  'Instalación y reparación de cierres metálicos con materiales certificados.',
  null,
  true,
  10
where not exists (select 1 from product where slug = 'cierres-metalicos');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '11111111-1111-1111-1111-111111111112'::uuid,
  'puertas-acorazadas',
  'Puertas Acorazadas',
  'Puertas de seguridad de alta gama.',
  'Asesoramiento, instalación y mantenimiento de puertas acorazadas.',
  null,
  true,
  20
where not exists (select 1 from product where slug = 'puertas-acorazadas');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '11111111-1111-1111-1111-111111111113'::uuid,
  'aluminio-tecnico',
  'Carpintería de Aluminio',
  'Sistemas avanzados para proyectos técnicos.',
  'Ventanas, puertas y cerramientos de aluminio para residencial e industrial.',
  null,
  true,
  30
where not exists (select 1 from product where slug = 'aluminio-tecnico');

insert into portfolio_item (id, title, category, description, image_url, active, sort_order)
select
  '22222222-2222-2222-2222-222222222221'::uuid,
  'Fachada Comercial',
  'Comercial',
  'Fachada con perfiles de aluminio y vidrio de seguridad.',
  null,
  true,
  10
where not exists (select 1 from portfolio_item where title = 'Fachada Comercial' and category = 'Comercial');

insert into portfolio_item (id, title, category, description, image_url, active, sort_order)
select
  '22222222-2222-2222-2222-222222222222'::uuid,
  'Cerramiento Residencial',
  'Residencial',
  'Cerramiento térmico con rotura de puente térmico.',
  null,
  true,
  20
where not exists (select 1 from portfolio_item where title = 'Cerramiento Residencial' and category = 'Residencial');

