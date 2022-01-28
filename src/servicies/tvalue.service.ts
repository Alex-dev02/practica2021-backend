import { getConnection } from "typeorm";
import { TValue } from "../entities/TValue";

export const getAllTValues = async(): Promise<TValue[]> => {
    return await getConnection().getRepository(TValue).find();
}

export const saveTValue = async(value: number, boardId: string): Promise<TValue> => {
    return await getConnection().getRepository(TValue).save({
        value: value,
        boardId: boardId,
    })
}