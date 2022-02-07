import { DeleteResult, getConnection } from "typeorm";
import { TValue } from "../entities/TValue";

export const saveTValue = async(value: number, boardId: string): Promise<TValue> => {
    return await getConnection().getRepository(TValue).save({
        value: value,
        boardId: boardId,
    });
}

export const getTValueById = async(id: string): Promise<TValue | undefined> => {
    return await getConnection().getRepository(TValue).findOne({id: id});
}

export const getLastAddedValue = async(): Promise<TValue| undefined> => {
    return await getConnection().getRepository(TValue).findOne({
        order: {
            created: 'DESC',
        }
    });
}

export const getAllTValues = async(): Promise<TValue[]> => {
    return await getConnection().getRepository(TValue).find();
}

export const updateTValue = async(newTValue: TValue): Promise<TValue> => {
    return await getConnection().getRepository(TValue).save(newTValue);
}

export const deleteTValue = async(tvalueId: string): Promise<DeleteResult> => {
    return await getConnection().getRepository(TValue).delete({id: tvalueId});
}
