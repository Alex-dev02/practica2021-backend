import tvalues from '../controllers/tvalue.controller';
import boards from '../controllers/board.controller';

export function getRouters() {
    return [
        tvalues,
        boards
    ];
}