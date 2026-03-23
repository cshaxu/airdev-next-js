// internal - secrets
export const INTERNAL_SECRET = process.env.BAREBONE_NEXT_INTERNAL_SECRET!;
export const CRON_SECRET = process.env.CRON_SECRET ?? INTERNAL_SECRET;
