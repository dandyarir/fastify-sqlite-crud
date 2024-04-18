export type TCatalog = {
  id?: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at?: Date;
  updated_by?: string;
  variants?: TVariant[];
}

export type TVariant = {
  id: number;
  name: string;
  price: number;
  catalog_id: number;
  created_at: Date;
  updated_at?: Date;
  updated_by?: string;
}

export type TCreateCatalog = {
  name: string;
  description: string;
  variants: TCreateVariant[];
  created_at: Date;
  created_by: string;
}

export type TCreateVariant = {
  name: string;
  sku: string;
  price: number;
  created_at: Date;
  created_by: string;
}

export type TUpdateCatalog = {
  name?: string;
  description?: string;
  variants?: TUpdateVariant[];
  updated_at: Date;
  updated_by: string;
}

export type TUpdateVariant = {
  variant_id: number;
  name?: string;
  price?: number;
  updated_at: Date;
  updated_by: string;
}