-- Corrige a frota exibida sem alterar os valores já cadastrados.
-- Reaproveita os quatro primeiros registros ativos para preservar price_per_week.
-- Fotos escolhidas para corresponder aos modelos solicitados.

CREATE TEMP TABLE _util_fleet_target (
  rn INTEGER PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  body_type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT
) ON COMMIT DROP;

INSERT INTO _util_fleet_target (rn, brand, model, body_type, image_url, description)
VALUES
  (
    1,
    'Volkswagen',
    'Polo Track',
    'Hatch',
    'https://production.autoforce.com/uploads/picture/image/251334413/comprar-polo-track-2025_0d8c8073d4.png',
    'Volkswagen Polo Track. Consulte disponibilidade e condições da locação.'
  ),
  (
    2,
    'Hyundai',
    'HB20 Hatch',
    'Hatch',
    'https://http2.mlstatic.com/D_NQ_NP_695899-MLB108021416739_032026-O-hyundai-hb20-sense-plus-10-flex-2025.webp',
    'Hyundai HB20 Hatch. Consulte disponibilidade e condições da locação.'
  ),
  (
    3,
    'Hyundai',
    'HB20 Sedan (HB20S)',
    'Sedã',
    'https://garagem360.com.br/wp-content/uploads/2024/05/hyundai-hb20s-comfort-plus-tgdi-at-2025-4-1200x720.jpg',
    'Hyundai HB20 Sedan (HB20S). Consulte disponibilidade e condições da locação.'
  ),
  (
    4,
    'Chevrolet',
    'Onix Sedan (Onix Plus)',
    'Sedã',
    'https://next-files-bucket.s3.us-east-1.amazonaws.com/template/34/site/328/modules/sub_modules/720/new/78b3fdc1581b165f10361761681183.png',
    'Chevrolet Onix Sedan (Onix Plus). Consulte disponibilidade e condições da locação.'
  );

-- Ranqueia a frota atual e reaproveita os registros existentes.
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      ORDER BY COALESCE(sort_order, 9999), created_at NULLS LAST, id
    ) AS rn
  FROM public.vehicles
  WHERE COALESCE(is_active, true) = true
),
updates AS (
  SELECT r.id, t.*
  FROM ranked r
  JOIN _util_fleet_target t ON t.rn = r.rn
)
UPDATE public.vehicles v
SET
  brand = u.brand,
  model = u.model,
  year = GREATEST(COALESCE(v.year, 2025), 2025),
  body_type = u.body_type,
  image_url = u.image_url,
  description = u.description,
  transmission = NULL,
  app_category = NULL,
  features = ARRAY[]::TEXT[],
  is_active = true,
  sort_order = u.rn
FROM updates u
WHERE v.id = u.id;

-- Desativa qualquer veículo ativo além dos quatro modelos definidos.
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      ORDER BY COALESCE(sort_order, 9999), created_at NULLS LAST, id
    ) AS rn
  FROM public.vehicles
  WHERE COALESCE(is_active, true) = true
)
UPDATE public.vehicles v
SET is_active = false
FROM ranked r
WHERE v.id = r.id
  AND r.rn > 4;

-- Caso o banco tenha menos de quatro registros ativos, cria apenas os faltantes.
-- O preço fica em branco nesses raros casos para não inventar valores.
INSERT INTO public.vehicles (
  brand,
  model,
  year,
  price_per_week,
  features,
  image_url,
  is_active,
  transmission,
  body_type,
  app_category,
  description,
  sort_order
)
SELECT
  t.brand,
  t.model,
  2025,
  NULL,
  ARRAY[]::TEXT[],
  t.image_url,
  true,
  NULL,
  t.body_type,
  NULL,
  t.description,
  t.rn
FROM _util_fleet_target t
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vehicles v
  WHERE v.is_active = true
    AND v.sort_order = t.rn
);

-- Garante nomenclatura amigável para o painel/site.
UPDATE public.vehicles
SET model = 'HB20 Hatch'
WHERE is_active = true
  AND sort_order = 2;

UPDATE public.vehicles
SET model = 'HB20 Sedan (HB20S)'
WHERE is_active = true
  AND sort_order = 3;

UPDATE public.vehicles
SET model = 'Onix Sedan (Onix Plus)'
WHERE is_active = true
  AND sort_order = 4;
