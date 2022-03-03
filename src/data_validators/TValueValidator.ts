import Ajv, {JSONSchemaType} from 'ajv';
import addFromats from 'ajv-formats';

import { NewTValueSchema, UpdateTValueSchema } from './ValidationInterfaces';

const ajv = new Ajv();
addFromats(ajv);

const newTValueSchema: JSONSchemaType<NewTValueSchema> = {
  type: 'object',
  properties: {
    value: {
      type: 'integer'
    },
    board: {
      type: 'string'
    }
  },
  required: ['value', 'board'],
  additionalProperties: false
};

const updateTValueSchema: JSONSchemaType<UpdateTValueSchema> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    value: {
      type: 'integer'
    },
    board: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: ['id', 'value', 'board'],
  additionalProperties: false
};

export const updateTValueValidator = ajv.compile<NewTValueSchema>(updateTValueSchema);
export const newTValueValidator = ajv.compile<UpdateTValueSchema>(newTValueSchema);
