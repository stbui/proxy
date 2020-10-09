import "reflect-metadata";
import { metadata } from "../constants";

export const Option = (option: object = {}): MethodDecorator => {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata("option", target.constructor)) {
      Reflect.defineMetadata("option", [], target.constructor);
    }

    const options = Reflect.getMetadata("option", target.constructor);

    options.push({
      ...option,
      methodName: propertyKey,
    });

    Reflect.defineMetadata(
      metadata.OPTION_IDENTIFIER,
      options,
      target.constructor
    );
  };
};