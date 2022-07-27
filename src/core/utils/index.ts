export const sanitizeParams = (str: string) => str.split('/').filter(Boolean);

export const isParamTemplate = (str: string) => str.includes(':');
