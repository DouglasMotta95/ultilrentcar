-- Galeria administrável por veículo.
-- Mantém image_url como foto principal para compatibilidade.
ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[] NOT NULL DEFAULT '{}';

UPDATE public.vehicles
SET gallery_images = ARRAY[image_url]
WHERE image_url IS NOT NULL
  AND image_url <> ''
  AND COALESCE(array_length(gallery_images, 1), 0) = 0;
