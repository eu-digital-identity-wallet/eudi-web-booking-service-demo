import { ZodSchema } from 'zod';

export const ValidateInput = <T>(schema: ZodSchema<T>): MethodDecorator => {
  return function (_: Object, __: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const input = args[0];
        const validatedInput = schema.parse(input);
        return originalMethod.apply(this, [validatedInput, ...args.slice(1)]);
      } catch (error) {
        throw new Error(`Validation error: ${error}`);
      }
    };

    return descriptor;
  };
};
