import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import { NewBoardSchema, UpdateBoardSchema } from './ValidationInterfaces';

const ajv = new Ajv();
addFormats(ajv);

const newBoardSchema: JSONSchemaType<NewBoardSchema> = {
  type: 'object',
  properties: {
    board: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_.-]*$'
    }
  },
  required: ['board'],
  additionalProperties: false
}

const updateBoardSchema: JSONSchemaType<UpdateBoardSchema> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    board: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_.-]*$'
    }
  },
  required: ['id', 'board'],
  additionalProperties: false
}

export const newBoardValidator = ajv.compile<NewBoardSchema>(newBoardSchema);
export const updateBoardValidator = ajv.compile<UpdateBoardSchema>(updateBoardSchema);
