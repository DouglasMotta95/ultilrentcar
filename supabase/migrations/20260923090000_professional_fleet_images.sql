-- Checkup visual da frota: galerias oficiais por modelo e imagens em alta resolução.
-- Não altera preços nem os quatro modelos já definidos.

UPDATE public.vehicles
SET
  image_url = 'https://assets.volkswagen.com/is/image/volkswagenag/Polo-Track-IPI-ZERO?Zm10PXBuZy1hbHBoYSZ3aWQ9MjQwMCZiZmM9b2ZmJjBhZmM=%3D',
  gallery_images = ARRAY[
    'https://assets.volkswagen.com/is/image/volkswagenag/Polo-Track-IPI-ZERO?Zm10PXBuZy1hbHBoYSZ3aWQ9MjQwMCZiZmM9b2ZmJjBhZmM=%3D'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND lower(brand) = 'volkswagen'
  AND lower(model) = 'polo track';

UPDATE public.vehicles
SET
  image_url = 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/mh/mh-desk.jpeg?imwidth=2400',
  gallery_images = ARRAY[
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/mh/mh-desk.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-01.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-02.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-03.jpeg?imwidth=2400',
    'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-04.jpeg?imwidth=2400'
  ]::TEXT[]
WHERE COALESCE(is_active, true) = true
  AND lower(brand) = 'chevrolet'
  AND lower(model) LIKE '%onix%'
  AND (lower(model) LIKE '%plus%' OR lower(model) LIKE '%sedan%');

-- Mantém as galerias já separadas do HB20 Hatch e HB20S.
UPDATE public.vehicles
SET gallery_images = ARRAY(
  SELECT DISTINCT value
  FROM unnest(gallery_images) AS value
  WHERE value IS NOT NULL AND value <> ''
)
WHERE COALESCE(is_active, true) = true
  AND lower(brand) = 'hyundai'
  AND lower(model) IN ('hb20 hatch', 'hb20 sedan (hb20s)');
