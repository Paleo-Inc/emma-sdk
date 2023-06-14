// Purpose: Defines the schema for the configuration file.

import { deepCopy } from "./helper";
import { FetcherFunction } from "./types";

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

export interface BooleanSchema {
  type: ValueType.BOOLEAN;
}

export interface ArraySchema {
  type: ValueType.ARRAY;
}

export interface StringSchema {
  type: ValueType.STRING;
}

export type Schema =
  | BooleanSchema
  | StringSchema
  | ArraySchema
  | GenericObjectSchema;

export type ObjectSchemaProperties<K extends string = never> = {
  [K2 in K | string]: Schema;
};

export interface ObjectSchemaDefinition<K extends string, L extends string> {
  type: ValueType.OBJECT;

  properties: ObjectSchemaProperties<K | L>;

  idProperty: K;

  displayProperty: K;

  featuredProperties?: L[];
}

export interface fetchDefinition<K extends string, T> {
  parameters?: Array<K>;

  execute: (fetcher: FetcherFunction<T>) => Promise<T>;
}

export interface DataConnectionDefinition<K extends string, L extends string> {
  name: string;

  description?: string;

  identityName: string;

  identityTitle: string;

  schema: ObjectSchemaDefinition<K, L>;

  fetch: fetchDefinition<K, any>;
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
  if (schema.featuredProperties) {
    schema.featuredProperties.forEach((key) => {
      checkIfExistInProperty(schema, key);
    });
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
