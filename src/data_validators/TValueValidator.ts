import Ajv, {JTDSchemaType} from 'ajv/dist/jtd';
import { NewTValueSchema } from './ValidationInterfaces';

const ajv = new Ajv();

const TValueSchema: JTDSchemaType<NewTValueSchema> = {
  properties: {
    value: {
      type: 'int32'
    },
    board: {
      type: 'string',
    }
  },
}

export const newTvalueValidator = ajv.compile<NewTValueSchema>(TValueSchema);
