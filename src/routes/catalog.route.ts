import { FastifyInstance } from "fastify";
import CatalogController from "../controllers/catalog.controller";
import validator from "../middleware/schema.validator";
import { Prisma } from "@prisma/client";

const catalogSchema = {
    type: 'object', 
    properties: {
        name: { type: 'string', minLength: 3, maxLength: 30 },
        description: { type: 'string', minLength: 10, maxLength: 100 },
        variants: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', minLength: 3, maxLength: 30 },
                    sku: { type: 'string', minLength: 3, maxLength: 30 },
                    price: { type: 'number', minimum: 1000 },
                },
                required: ['name', 'sku', 'price'],
                additionalProperties: false,
            }
        }
    },
    required: ['name', 'description','variants'],
    additionalProperties: false,
};
export const catalogRoutes = (app: FastifyInstance) => {
    app.route({
        logLevel: 'trace',
        method: 'POST',
        url: '/catalog',
        schema: {
            body: catalogSchema,
            response: {
                201: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                catalog_id: {
                                  type: 'number',
                                }
                            }
                        }
                    },
                }
            }
        },
        config: {
            openapi: {
                description: 'Create a catalog',
                summary: 'Create catalog',
                tags: ['Catalog']
            }
        },
        preHandler: validator(catalogSchema),        
        handler: CatalogController.create,
    });

    app.route({
      logLevel: 'info',
      method: 'GET',
      url: '/catalog/:catalogId',
      schema: {
          params: {
              type: 'object',
              properties: {
                  catalogId: { type: 'number' }
              }
          },
          response: {
              200: {
                  type: 'object',
                  properties: {
                      catalog_id: { type: 'number' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      created_at: { type: 'string' },
                      updated_at: { type: 'string' },
                      updated_by: { type: 'string' },
                      variants: {
                          type: 'array',
                          items: {
                              type: 'object',
                              properties: {
                                  variant_id: { type: 'number' },
                                  name: { type: 'string' },
                                  sku: { type: 'string' },
                                  price: { type: 'number' },
                                  catalog_id: { type: 'number' },
                                  created_at: { type: 'string' },
                                  updated_at: { type: 'string' },
                                  updated_by: { type: 'string' },
                              }
                          }
                      }
                  },
              },
          }
      },
      config: {
          openapi: {
              description: 'Get detail catalog',
              summary: 'Get detail catalog',
              tags: ['Catalog'],
          }
      },
      handler: CatalogController.getDetailCatalog,
    })

    app.route({
        method: 'GET',
        url: '/catalog',
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'number', default: 10 },
                    offset: { type: 'number', default: 0 },
                    sortBy: { type: 'string', enum: Object.entries(Prisma.CatalogScalarFieldEnum).map(([, value]) => value), default: Prisma.CatalogScalarFieldEnum.catalog_id },
                    sortOrder: { type: 'string', default: 'asc' },

                }
            },
            response: {
                200: {
                    type: 'array',
                    description: 'The response payload',
                    items: {
                        type: 'object',
                        properties: {
                            catalog_id: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            created_at: { type: 'string' },
                            updated_at: { type: 'string' },
                            updated_by: { type: 'string' },
                            variants: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        variant_id: { type: 'number' },
                                        name: { type: 'string' },
                                        sku: { type: 'string' },
                                        price: { type: 'number' },
                                        catalog_id: { type: 'number' },
                                        created_at: { type: 'string' },
                                        updated_at: { type: 'string' },
                                        updated_by: { type: 'string' },
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        config: {
            openapi: {
                description: 'Get lists of catalog',
                summary: 'Get catalogs',
                tags: ['Catalog'],
            }
        },
        handler: CatalogController.getCatalog,
    });

    app.route({
        method: 'PUT',
        url: '/catalog/:catalogId',
        schema: {
            params: {
                type: 'object',
                properties: {
                    catalogId: { type: 'number' }
                }
            },
            body: {
                type: 'object', 
                properties: {
                    name: { type: 'string', minLength: 3, maxLength: 30 },
                    description: { type: 'string', minLength: 10, maxLength: 100 },
                    variants: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', minLength: 3, maxLength: 30 },
                                price: { type: 'number', minimum: 1000 },
                            },
                            required: ['name', 'price'],
                            additionalProperties: false,
                        }
                    }
                },
                required: ['name', 'description'],
                additionalProperties: false,
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        catalog_id: {   
                            type: 'number',
                        },
                    },
                },
            }
        },
        config: {
            openapi: {
                description: 'Update catalog',
                summary: 'Update catalog',
                tags: ['Catalog'],
            }
        },
        preHandler: validator(
            {
                type: 'object',
                properties: {
                    catalogId: { type: 'number' },
                    name: { type: 'string', minLength: 3, maxLength: 30 },
                    description: { type: 'string', minLength: 10, maxLength: 100 },
                    variants: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', minLength: 3, maxLength: 30 },
                                price: { type: 'number', minimum: 1000 },
                            },
                            required: ['name', 'price'],
                            additionalProperties: false,
                        }
                    }
                },
                required: ['name', 'description', 'catalogId'],
                additionalProperties: false,
            }
        
        ),
        handler: CatalogController.updateCatalog,
    });

    app.route({
        method: 'DELETE',
        url: '/catalog/:catalogId',
        schema: {
            params: {
                type: 'object',
                properties: {
                    catalogId: { type: 'number' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        catalog_id: {
                            type: 'number',
                        },
                    },
                },
            }
        },
        config: {
            openapi: {
                description: 'Delete catalog',
                summary: 'Delete catalog as well as its variants',
                tags: ['Catalog'],
            }
        },
        handler: CatalogController.deleteCatalog,
    });

};
