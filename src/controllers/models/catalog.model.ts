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
    const body: Prisma.CatalogUpdateInput = {};

    body.updated_by = 'system';
    if (params.name) body.name = params.name;
    if (params.description) body.description = params.description;
    if (params.updated_by) body.updated_by = params.updated_by;
    if (params.variants) {
      body.variants = {
        update: params.variants.map((variant) => ({
          where: { variant_id: variant.variant_id },
          data: {
            name: variant.name,
            price: variant.price,
            updated_at: new Date(),
            updated_by: variant.updated_by || 'system',
          },
        })),
      };
    }

    return body;
  }
}