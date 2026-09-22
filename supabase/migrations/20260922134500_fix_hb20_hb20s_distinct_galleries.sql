-- Corrige definitivamente as galerias dos dois Hyundai.
-- Cada modelo recebe apenas fotos oficiais do próprio veículo, em ângulos diferentes.
-- A primeira foto continua sendo a principal do card.

UPDATE public.vehicles
SET
  brand = 'Hyundai',
  model = 'HB20 Hatch',
  body_type = 'Hatch',
  image_url = 'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp',
  gallery_images = ARRAY[
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/internas/interna_arcondicionado.webp'
  ]::TEXT[],
  description = 'Hyundai HB20 Hatch. Consulte disponibilidade e condições da locação.'
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
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/internas/thumb/interna_arcondicionado_330x330.webp'
  ]::TEXT[],
  description = 'Hyundai HB20 Sedan (HB20S). Consulte disponibilidade e condições da locação.'
WHERE COALESCE(is_active, true) = true
  AND sort_order = 3;

-- Proteção extra: se houver registros Hyundai ativos com nomenclatura antiga,
-- aplica a galeria correta pelo tipo de modelo, sem misturar Hatch e Sedan.
UPDATE public.vehicles
SET
  image_url = 'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp',
  gallery_images = ARRAY[
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp',
    'https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/internas/interna_arcondicionado.webp'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND lower(brand) = 'hyundai'
  AND lower(model) LIKE '%hb20%'
  AND lower(model) NOT LIKE '%hb20s%'
  AND lower(model) NOT LIKE '%sedan%';

UPDATE public.vehicles
SET
  image_url = 'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp',
  gallery_images = ARRAY[
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_lateral.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_traseira.webp',
    'https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/internas/thumb/interna_arcondicionado_330x330.webp'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND lower(brand) = 'hyundai'
  AND (
    lower(model) LIKE '%hb20s%'
    OR lower(model) LIKE '%sedan%'
  );
