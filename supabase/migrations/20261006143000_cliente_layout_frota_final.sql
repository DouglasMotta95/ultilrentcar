-- Ajuste final solicitado pelo cliente: frota sem ano/preço no card
-- e galerias separadas por modelo.
-- O layout controla a exibição de preço/ano; o banco mantém esses valores para uso administrativo.

UPDATE public.company_settings
SET
  hero_title = 'LOCAÇÃO DE VEÍCULOS PARA MOTORISTAS DE APLICATIVOS',
  hero_subtitle = 'Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para motoristas de aplicativos.',
  weekly_price_from = COALESCE(weekly_price_from, 700)
WHERE id = 1;

UPDATE public.vehicles
SET
  brand = 'Volkswagen',
  model = 'Polo Track',
  body_type = 'Hatch',
  image_url = 'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36482.webp',
  gallery_images = ARRAY[
    'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36482.webp',
    'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36481.webp',
    'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36479.webp',
    'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36478.webp',
    'https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36480.webp'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND sort_order = 1;

UPDATE public.vehicles
SET
  brand = 'Hyundai',
  model = 'HB20 Hatch',
  body_type = 'Hatch',
  image_url = 'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp',
  gallery_images = ARRAY[
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_grade.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/internas/interna_arcondicionado.webp'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND sort_order = 2;

UPDATE public.vehicles
SET
  brand = 'Hyundai',
  model = 'HB20 Sedan (HB20S)',
  body_type = 'Sedã',
  image_url = 'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp',
  gallery_images = ARRAY[
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_lateral.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_traseira.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_grade.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/internas/thumb/interna_arcondicionado_330x330.webp'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND sort_order = 3;

UPDATE public.vehicles
SET
  brand = 'Chevrolet',
  model = 'Onix Sedan (Onix Plus)',
  body_type = 'Sedã',
  image_url = 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/mh/mh-desk.jpeg?imwidth=2400',
  gallery_images = ARRAY[
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/mh/mh-desk.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-01.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-02.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-03.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/design/1/design-interior.jpg?imwidth=2400'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND sort_order = 4;
