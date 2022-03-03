import Ajv, {JSONSchemaType} from 'ajv';
import addFromats from 'ajv-formats';

const ajv = new Ajv();
addFromats(ajv);

export const uuidValidator = ajv.compile<string>({
  type: 'string',
  format: 'uuid',
  nullable: false
});