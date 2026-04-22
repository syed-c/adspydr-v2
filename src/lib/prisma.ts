// Stub Prisma client for build - will be replaced at runtime
// In production, use `npx prisma generate` before build
export const prisma: any = {
  user: {
    findUnique: async () => null,
    findFirst: async () => null,
    create: async () => ({ id: 'stub' }),
    update: async () => ({ id: 'stub' }),
    delete: async () => null,
    findMany: async () => [],
    count: async () => 0,
  },
  search: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
    findUnique: async () => null,
    update: async () => null,
    delete: async () => null,
  },
  ad: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
    findUnique: async () => null,
    update: async () => null,
  },
  trackedCompetitor: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
    findUnique: async () => null,
    update: async () => null,
    delete: async () => null,
  },
  alert: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
    update: async () => null,
    delete: async () => null,
  },
  report: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
    update: async () => null,
  },
  usageLog: {
    create: async () => ({ id: 'stub' }),
    findMany: async () => [],
  },
  session: {
    create: async () => ({ id: 'stub' }),
    findUnique: async () => null,
    delete: async () => null,
  },
  account: {
    create: async () => ({ id: 'stub' }),
    findUnique: async () => null,
    delete: async () => null,
  },
};
