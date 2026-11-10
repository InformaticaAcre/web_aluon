-- Seed products extracted from Aluon_Aluminio_Soldado_2019.pdf (OCR)
-- Idempotent inserts: only adds when slug doesn't exist.

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111111'::uuid,
  'aluon-premium',
  'ALUON PREMIUM',
  'Diseño actual y combinación técnica rompedora.',
  'El diseño más actual y la combinación técnica más rompedora, se ajustan al milímetro. Adaptable a puerta peatonal, correderas, batientes y cerramientos de parcela.',
  null,
  true,
  100
where not exists (select 1 from product where slug = 'aluon-premium');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111112'::uuid,
  'aluon-classic',
  'ALUON CLASSIC',
  'Diseño clásico sencillo y funcional.',
  'Lo actual no está reñido con lo clásico. Un diseño sencillo pero funcional, pensado para exterior y uso diario.',
  null,
  true,
  110
where not exists (select 1 from product where slug = 'aluon-classic');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111113'::uuid,
  'classic-celosia',
  'CLASSIC CELOSÍA',
  'Ornamentación clásica sobre clásico.',
  'Tenemos la capacidad de ornamentar: un diseño clásico sobre clásico, manteniendo robustez y ligereza del aluminio soldado.',
  null,
  true,
  120
where not exists (select 1 from product where slug = 'classic-celosia');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111114'::uuid,
  'premium-celosia',
  'PREMIUM CELOSÍA',
  'Mezcla perfecta que completa el entorno.',
  'Un planteamiento adaptado a un estilo. La mezcla perfecta que completa el entorno, con soluciones de lama y cenefas.',
  null,
  true,
  130
where not exists (select 1 from product where slug = 'premium-celosia');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111115'::uuid,
  'aluon-garden',
  'ALUON GARDEN',
  'Mimetización con el entorno, ajustada al milímetro.',
  'Mimetizarse con un entorno es una gran capacidad. Sistema GARDEN para cerramientos exteriores con medidas y configuraciones ajustadas al milímetro.',
  null,
  true,
  140
where not exists (select 1 from product where slug = 'aluon-garden');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111116'::uuid,
  'garden-celosia',
  'GARDEN CELOSÍA',
  'Fusión de dos estilos para cerrar un espacio.',
  'Donde se funden dos estilos para cerrar un espacio. La mezcla perfecta se añade al entorno, con opciones de cenefas.',
  null,
  true,
  150
where not exists (select 1 from product where slug = 'garden-celosia');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111117'::uuid,
  'veneciana-long',
  'VENECIANA LONG',
  'Veneciana de estilo adaptable y mezcla perfecta.',
  'Un planteamiento adaptado a un estilo. La mezcla perfecta que completa el entorno, con lama tubular y separaciones configurables.',
  null,
  true,
  160
where not exists (select 1 from product where slug = 'veneciana-long');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111118'::uuid,
  'aluon-inox',
  'ALUON INOX',
  'Contraste con acero inoxidable.',
  'El acero inoxidable es el inseparable compañero de un estilo. Un continuo contraste en paralelo para cerramientos de exterior.',
  null,
  true,
  170
where not exists (select 1 from product where slug = 'aluon-inox');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111119'::uuid,
  'aluon-bisel',
  'ALUON BISEL',
  'Paralelas proporcionales con contraste.',
  'Las paralelas proporcionales hacen contraste entre el exterior y tu otro exterior, con líneas limpias y presencia.',
  null,
  true,
  180
where not exists (select 1 from product where slug = 'aluon-bisel');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111120'::uuid,
  'veneciana-small',
  'VENECIANA SMALL',
  'Un clásico adaptado a todos los espacios.',
  'Un clásico adaptado a todos los tiempos y a todos los espacios. Versión compacta con diagonal y separación configurable.',
  null,
  true,
  190
where not exists (select 1 from product where slug = 'veneciana-small');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111121'::uuid,
  'aluon-innova',
  'ALUON INNOVA',
  'Continuidad que amplía el espacio.',
  'Proporciones unidas a la continuidad. Un estilo que, con su luz, amplía el espacio.',
  null,
  true,
  200
where not exists (select 1 from product where slug = 'aluon-innova');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111122'::uuid,
  'aluon-rustico',
  'ALUON RÚSTICO',
  'Clásico rústico unido a robustez y ligereza.',
  'Nunca pensamos que lo rústico se soldara. La unión de un clásico a la robustez y ligereza del aluminio soldado.',
  null,
  true,
  210
where not exists (select 1 from product where slug = 'aluon-rustico');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111123'::uuid,
  'aluon-marita',
  'ALUON MARITA',
  'Mezcla perfecta, adaptada a un estilo.',
  'Un planteamiento adaptado a un estilo. La mezcla perfecta que completa el entorno.',
  null,
  true,
  220
where not exists (select 1 from product where slug = 'aluon-marita');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111124'::uuid,
  'aluon-primavera',
  'ALUON PRIMAVERA',
  'Intimidad y discreción como resultado.',
  'La mezcla de la intimidad y la discreción tienen como resultado una forma. Incluye chapa perforada y nervio para mayor presencia.',
  null,
  true,
  230
where not exists (select 1 from product where slug = 'aluon-primavera');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111125'::uuid,
  'aluon-confort',
  'ALUON CONFORT',
  'Intimidad enmarcando trozos de cielo.',
  'Respeta la intimidad enmarcando pequeños trozos de cielo. Ahora el Confort es soldado para mayor durabilidad.',
  null,
  true,
  240
where not exists (select 1 from product where slug = 'aluon-confort');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111126'::uuid,
  'aluon-decor',
  'ALUON DECOR',
  'Decoración con opciones de cenefas.',
  'Un planteamiento adaptado a un estilo. La mezcla perfecta que completa el entorno, con opciones decorativas y cenefas.',
  null,
  true,
  250
where not exists (select 1 from product where slug = 'aluon-decor');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111127'::uuid,
  'aluon-forja',
  'ALUON FORJA',
  'Tradicional, ligero y silencioso.',
  'Lo tradicional soldado a lo ligero. Sin mantenimiento, no pesa y es más silencioso.',
  null,
  true,
  260
where not exists (select 1 from product where slug = 'aluon-forja');

insert into product (id, slug, name, short_description, description, image_url, active, sort_order)
select
  '31111111-1111-1111-1111-111111111128'::uuid,
  'aluon-veneciana',
  'ALUON VENECIANA',
  'Actualizar lo sencillo a cada espacio.',
  'Especialistas en actualizar productos: lo sencillo soldado a las necesidades de cada espacio.',
  null,
  true,
  270
where not exists (select 1 from product where slug = 'aluon-veneciana');

