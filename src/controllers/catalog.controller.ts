import { RESPONSE_CODE } from "../Constants/constant";
import { locale } from "../config/locales";
import { FastifyReply, FastifyRequest } from "fastify"
import prisma from "../config/prisma.config";
import { TCatalog } from "../type/catalog.type";
import { Prisma } from "@prisma/client";
import { CatalogModel } from "./models/catalog.model";

const catalogModel = new CatalogModel();

const create = async (request: FastifyRequest | { body: TCatalog | any }, reply: FastifyReply) => {
    try {
        const catalogResult = await prisma.catalog.create({
            data: catalogModel.toCreateCatalogPayload(request.body),
            select: {
                catalog_id: true,
                name: true,
                description: true,
                created_at: true,
                updated_at: true,
                updated_by: true,
                variants: {
                    select: {
                        variant_id: true,
                        name: true,
                        sku: true,
                        price: true,
                        catalog_id: true,
                        created_at: true,
                        updated_at: true,
                        updated_by: true
                    }
                }
            }
        });
        return reply.code(RESPONSE_CODE.CREATED).send({ data: catalogResult });
    } catch (error: any) {
        if (error?.meta?.target == 'Sku') {
            return reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('VARIANT_SKU_EXIST') });
        }
        return reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('SERVER_ERROR') });
    }
}

const getCatalog = async (request: FastifyRequest | any, reply: FastifyReply) => {
  try {
      const catalogs = await prisma.catalog.findMany({
          take: request.query.limit || 10,
          skip: request.query.offset || 0,
          orderBy: {
              [request.query.sortBy || Prisma.CatalogScalarFieldEnum.catalog_id ]: request.query.sortOrder || Prisma.SortOrder.asc  
          },
          select: {
              catalog_id: true,
              name: true,
              description: true,
              created_at: true,
              updated_at: true,
              updated_by: true,
              variants: {
                  select: {
                      variant_id: true,
                      name: true,
                      sku: true,
                      price: true,
                      catalog_id: true,
                      created_at: true,
                      created_by: true,
                      updated_at: true,
                      updated_by: true
                  }
              }
          },
      });
      return reply.code(RESPONSE_CODE.SUCCESS).send(catalogs);
  } catch (error: any) {
      console.log(error);
      
      return reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('SERVER_ERROR') });
  }
}

const getDetailCatalog = async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
        const catalog = await prisma.catalog.findFirst({
            where: {
                catalog_id: request.params.catalogId
            },
            select: {
                catalog_id: true,
                name: true,
                description: true,
                created_at: true,
                updated_at: true,
                updated_by: true,
                variants: {
                    select: {
                        variant_id: true,
                        name: true,
                        sku: true,
                        price: true,
                        catalog_id: true,
                        created_at: true,
                        updated_at: true,
                        updated_by: true
                    }
                }
            },
        });
        return reply.code(RESPONSE_CODE.SUCCESS).send(catalog);
    } catch (error: any) {
        return reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('SERVER_ERROR') });
    }
}

const updateCatalog = async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
        await prisma.catalog.update({
            where: {
                catalog_id: request.params.catalogId
            },
            data: catalogModel.toUpdateCatalogPayload(request.body)
        });
        reply.code(RESPONSE_CODE.SUCCESS).send( { message: locale('CATALOG_UPDATE_SUCCESS') });
    } catch (error: any) {
        reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('SERVER_ERROR') });
    }
}

const deleteCatalog = async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
        await prisma.catalog.delete({
            where: {
                catalog_id: request.params.catalogId
            }
        });
        reply.code(RESPONSE_CODE.SUCCESS).send({ message: locale('CATALOG_DELETE_SUCCESS') });
    } catch (error: any) {
        reply.code(RESPONSE_CODE.BAD_REQUEST).send({ message: locale('SERVER_ERROR') });
    }
}

export default {
    create,
    getDetailCatalog,
    updateCatalog,
    deleteCatalog,
    getCatalog
}