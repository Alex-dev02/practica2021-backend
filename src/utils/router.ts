import tvalues from '../controllers/tvalue.controller';
import boards from '../controllers/board.controller';
import env_info from '../controllers/env_info.controller';

export function getRouters() {
    return [
      tvalues,
      boards,
      env_info,
    ];
}