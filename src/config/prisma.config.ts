import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const offsetTime = 7 * 60 * 60 * 1000; // GMT + 7
const offsetKey = Symbol('key');

prisma.$use(async (params, next) => {
  const setOffsetTime = (obj: any, offsetTime: number) => {
    if (obj === null || obj[obj]) return;
    for (const key in obj) {
      if (obj[key] instanceof Date) {
        obj[key] = new Date(obj[key].getTime() + offsetTime);
      } else if (typeof obj[key] === 'object') {
        setOffsetTime(obj[key], offsetTime);
      }
    }
    obj[offsetKey] = true;
  };



  setOffsetTime(params, offsetTime);
  return next(params);
});

export default prisma;