import { Prisma } from "@prisma/client";
import { TCreateCatalog, TUpdateCatalog } from "../../type/catalog.type";

export class CatalogModel {
  toCreateCatalogPayload(params: TCreateCatalog) {
    const body: Prisma.CatalogCreateInput = {
      name: params.name,
      description: params.description,
      created_at: params.created_at || new Date(),
      created_by: params.created_by || 'system',
      variants: {
        create: params.variants.map((variant) => ({
          name: variant.name,
          sku: variant.sku,
          price: variant.price,
          created_at: variant.created_at || new Date(),
          created_by: variant.created_by || 'system',
        })),
      },
    };

    return body;
  }

  toUpdateCatalogPayload(params: TUpdateCatalog) {
    const body: Prisma.CatalogUpdateInput = {
      name: params.name,
      description: params.description,
      variants: {
        update: params.variants?.map((variant) => ({
          where: { variant_id: variant.id },
          data: {
            name: variant.name,
            price: variant.price,
            updated_at: variant.updated_at || new Date(),
            updated_by: variant.updated_by || 'system',
          },
        })),
      },
      updated_at: params.updated_at,
      updated_by: params.updated_by,
    };

    return body;
  }
}