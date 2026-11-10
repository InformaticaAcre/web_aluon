-- Link seeded products to local frontend public images (served by Vite at /products/*.jpg)
-- Idempotent: only fills when image_url is null/empty.

update product
set image_url = '/products/aluon-premium.jpg'
where slug = 'aluon-premium' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-classic.jpg'
where slug = 'aluon-classic' and (image_url is null or image_url = '');

update product
set image_url = '/products/classic-celosia.jpg'
where slug = 'classic-celosia' and (image_url is null or image_url = '');

update product
set image_url = '/products/premium-celosia.jpg'
where slug = 'premium-celosia' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-garden.jpg'
where slug = 'aluon-garden' and (image_url is null or image_url = '');

update product
set image_url = '/products/garden-celosia.jpg'
where slug = 'garden-celosia' and (image_url is null or image_url = '');

update product
set image_url = '/products/veneciana-long.jpg'
where slug = 'veneciana-long' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-inox.jpg'
where slug = 'aluon-inox' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-bisel.jpg'
where slug = 'aluon-bisel' and (image_url is null or image_url = '');

update product
set image_url = '/products/veneciana-small.jpg'
where slug = 'veneciana-small' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-innova.jpg'
where slug = 'aluon-innova' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-rustico.jpg'
where slug = 'aluon-rustico' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-marita.jpg'
where slug = 'aluon-marita' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-primavera.jpg'
where slug = 'aluon-primavera' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-confort.jpg'
where slug = 'aluon-confort' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-decor.jpg'
where slug = 'aluon-decor' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-forja.jpg'
where slug = 'aluon-forja' and (image_url is null or image_url = '');

update product
set image_url = '/products/aluon-veneciana.jpg'
where slug = 'aluon-veneciana' and (image_url is null or image_url = '');

