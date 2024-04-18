import { FastifyReply, FastifyRequest } from "fastify";
import { prismaMock } from '../src/config/test.service.config';
import catalogController from '../src/controllers/catalog.controller';

describe('catalog route test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('DELETE /catalog', () => {
    it('should delete a catalog', async () => {
      const mockRequest = {
        params: { 
          catalogId: "1",
        },
      };
      const mockReply = {
          code: jest.fn(() => mockReply),
          send: jest.fn(),
      } as unknown as FastifyReply;
  
      const mockDelete = jest.fn().mockResolvedValue({
        catalog_id: 1,
      });
      prismaMock.catalog.update.mockImplementation(mockDelete);
  
      await catalogController.deleteCatalog(mockRequest as unknown as FastifyRequest, mockReply);
  
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ message: expect.any(String), catalog_id: expect.any(Number) });
    });
  });
  
  describe('POST /catalog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a catalog', async () => {
      const mockRequest = {
        body: {
          "name": "Sosro",
          "description": "Minuman Teh",
          "variants": [
            {
              "name": "Original",
              "sku": "SOO1-test",
              "price": 7000
            }
          ]
        }
      };
      const mockReply = {
          code: jest.fn(() => mockReply),
          send: jest.fn(),
      } as unknown as FastifyReply;
  
      // Add your mock implementation for CatalogController.create here
      const mockDelete = jest.fn().mockResolvedValue({
        catalog_id: 4,
      });
      prismaMock.catalog.create.mockImplementation(mockDelete);
      await catalogController.create(mockRequest as unknown as FastifyRequest, mockReply);
  
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({ data: { catalog_id: 4 }});
    });
  });
  
  describe('GET /catalog/:catalogId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get detail of a catalog', async () => {
      const mockRequest = {
        params: {
          catalogId: 1,
        },
      };
      const mockReply = {
          code: jest.fn(() => mockReply),
          send: jest.fn(),
      } as unknown as FastifyReply;
  
      // Add your mock implementation for CatalogController.getDetailCatalog here
      const mockFindFirst = jest.fn().mockResolvedValue({
        catalog_id: 1,
        name: "Sosro",
        description: "Minuman Teh",
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: "system",
        variants: [
          {
            variant_id: 1,
            name: "Original",
            sku: "SOO1-test",
            price: 7000,
            catalog_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            updated_by: "system",
          },
        ],
      });
      prismaMock.catalog.findFirst.mockImplementation(mockFindFirst);
      await catalogController.getDetailCatalog(mockRequest as unknown as FastifyRequest, mockReply);
  
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(expect.objectContaining({
        catalog_id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        updated_by: expect.any(String),
        variants: expect.arrayContaining([
          expect.objectContaining({
            variant_id: expect.any(Number),
            name: expect.any(String),
            sku: expect.any(String),
            price: expect.any(Number),
            catalog_id: expect.any(Number),
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
            updated_by: expect.any(String),
          }),
        ]),
      }));
    });
  });
  
  describe('GET /catalog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get a list of catalogs', async () => {
      const mockRequest = {
        query: {
          limit: "1",
        },
      };
      const mockReply = {
          code: jest.fn(() => mockReply),
          send: jest.fn(),
      } as unknown as FastifyReply;
  
      // Add your mock implementation for CatalogController.getCatalog here

      const mockFindMany = jest.fn().mockResolvedValue([
        {
          catalog_id: 1,
          name: "Sosro",
          description: "Minuman Teh",
          created_at: new Date(),
          created_by: "system",
          updated_at: new Date(),
          updated_by: "system",
          variants: [
            {
              variant_id: 1,
              name: "Original",
              sku: "SOO1-test",
              price: 7000,
              catalog_id: 1,
              created_at: new Date(),
              created_by: "system",
              updated_at: new Date(),
              updated_by: "system",
            },
          ],
        },
      ]);
      prismaMock.catalog.findMany.mockImplementation(mockFindMany);
      await catalogController.getCatalog(mockRequest as unknown as FastifyRequest, mockReply);
  
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          catalog_id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
          updated_by: expect.any(String),
          variants: expect.arrayContaining([
            expect.objectContaining({
              variant_id: expect.any(Number),
              name: expect.any(String),
              sku: expect.any(String),
              price: expect.any(Number),
              catalog_id: expect.any(Number),
              created_at: expect.any(Date),
              created_by: expect.any(String),
              updated_at: expect.any(Date),
              updated_by: expect.any(String)
            }),
          ]),
        }),
      ]));

    });
  });
  
  describe('PUT /catalog/:catalogId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a catalog', async () => {
      const mockRequest = {
        params: {
          catalogId: 7,
        },
        body: {
          name: "Sosro Edit",
          description: "Minuman Teh",
        },
      };
      const mockReply = {
          code: jest.fn(() => mockReply),
          send: jest.fn(),
      } as unknown as FastifyReply;
  
      // Add your mock implementation for CatalogController.updateCatalog here

      const mockUpdate = jest.fn().mockResolvedValue({
        catalog_id: 7,
      });
      prismaMock.catalog.update.mockImplementation(mockUpdate);
      await catalogController.updateCatalog(mockRequest as unknown as FastifyRequest, mockReply);
  
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
        catalog_id: 7,
      }));
    });
  });
});