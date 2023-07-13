// Purpose: Defines the schema for the configuration file.

import { deepCopy } from "./helper";
import { ContextType, InputType } from "./types";

// this value type is used to define the type of the value of the schema or any return type
export enum ValueType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  ARRAY = "array",
  DATE = "date",
  IMAGE = "image",
}
//
export type GenericObjectSchema = Record<string, string>;

export type BooleanSchema = {
  type: ValueType.BOOLEAN;
  name?: string;
  description?: string;
  friendlyName?: string;
  default?: boolean;
  required?: boolean;
};

export type ArraySchema = {
  type: ValueType.ARRAY;
  name?: string;
  description?: string;
  friendlyName?: string;
  default?: boolean;
  required?: boolean;
  items?: any;
};

export type StringSchema = {
  type: ValueType.STRING;
  name?: string;
  description?: string;
  friendlyName?: string;
  default?: boolean;
  required?: boolean;
};
export type NumberSchema = {
  type: ValueType.NUMBER;
  name?: string;
  description?: string;
  friendlyName?: string;
  default?: boolean;
  required?: boolean;
};

export type DateSchema = {
  type: ValueType.DATE;
  name?: string;
  description?: string;
  friendlyName?: string;
  default?: boolean;
  required?: boolean;
};

export type Schema =
  | BooleanSchema
  | StringSchema
  | ArraySchema
  | NumberSchema
  | DateSchema
  | GenericObjectSchema;

export type ObjectSchemaProperties<K extends string = never> = {
  [K2 in K | string]: Schema | ObjectSchemaProperties<K>;
};

export interface ObjectSchemaDefinition<K extends string, L extends string> {
  type: ValueType.OBJECT;

  friendlyName?: string;

  properties: ObjectSchemaProperties<K | L>;

  idProperty: K;

  displayProperty: K;

  featuredProperties?: L[];
}

export interface fetchDefinition<K, T> {
  parameters?: Array<K>;

  execute: (inputs: string[], context: ContextType) => Promise<T>;
}

export interface DataConnectionDefinition<K extends string, L extends string> {
  name: string;

  description?: string;

  identityName: string;

  identityTitle: string;

  schema: ObjectSchemaDefinition<K, L>;

  fetch: fetchDefinition<InputType, any>;
}
export function makeObjectSchema<
  K extends string,
  L extends string,
  T extends Omit<ObjectSchemaDefinition<K, L>, "type">
>(schema: T): ObjectSchemaDefinition<K, L> {
  let returnSchema: ObjectSchemaDefinition<K, L> = {
    ...schema,
    type: ValueType.OBJECT,
  };
  for (const k in Object.keys(returnSchema.properties)) {
    // deep copy in case there are multiple schema used in multiple properties
    if (k != "type" && typeof returnSchema.properties[k] == "object") {
      let copykey = k as keyof ObjectSchemaProperties<K | L>;
      returnSchema.properties[copykey] = deepCopy(
        returnSchema.properties[copykey]
      );
    }
  }
  validateSchema(returnSchema);
  return returnSchema;
}

function validateSchema<
  K extends string,
  L extends string,
  T extends ObjectSchemaDefinition<K, L>
>(schema: T) {
  checkIfExistInProperty(schema, schema.idProperty);
  checkIfExistInProperty(schema, schema.displayProperty);
  checkKeyName(schema.idProperty);
  checkKeyName(schema.displayProperty);
  if (schema.featuredProperties) {
    schema.featuredProperties.forEach((key) => {
      checkIfExistInProperty(schema, key);
    });
  }
  for (const key in schema.properties) {
    checkKeyName(key);
  }
}

function checkIfExistInProperty<
  K extends string,
  L extends string,
  T extends ObjectSchemaDefinition<K, L>
>(schema: T, key: string) {
  if (!Object.keys(schema.properties).includes(key)) {
    throw new Error(`Key ${key} does not exist in properties`);
  }
}

export function checkKeyName(key: string) {
  if (!key.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Key ${key} is not valid`);
  }
}
