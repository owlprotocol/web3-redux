import { maxBy } from 'lodash';
import { createSelector } from 'redux-orm';
import { Network } from './model';
import { Block } from '../block/model';
import { Transaction } from '../transaction/model';
import { Contract } from '../contract/model';
import { orm } from '../orm';
import { Interface as ContractEvent } from '../contractevent';

type selectByIdSingle = (state: any, id?: string) => Network | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (Network | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.Network);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as Network | undefined;
};
export const selectByIdMany = selectById as selectByIdMany;

type selectSingleBlocks = (state: any, id?: string) => Block[] | null;
type selectManyBlocks = (state: any, ids?: string[]) => (Block[] | null)[];
export const selectBlocks: selectSingleBlocks | selectManyBlocks = createSelector(orm.Network.blocks);
export const selectSingleBlocks = selectBlocks as selectSingleBlocks;
export const selectManyBlocks = selectBlocks as selectManyBlocks;

type selectSingleTransactions = (state: any, id: string) => Transaction[] | null;
type selectManyTransactions = (state: any, ids?: string[]) => (Transaction[] | null)[];
export const selectTransactions: selectSingleTransactions | selectManyTransactions = createSelector(
    orm.Network.transactions,
);
export const selectSingleTransactions = selectTransactions as selectSingleTransactions;
export const selectManyTransactions = selectTransactions as selectManyTransactions;

type selectSingleContracts = (state: any, id: string) => Contract[] | null;
type selectManyContracts = (state: any, ids?: string[]) => (Contract[] | null)[];
export const selectContracts: selectSingleContracts | selectManyContracts = createSelector(orm.Network.contracts);
export const selectSingleContracts = selectContracts as selectSingleContracts;
export const selectManyContracts = selectContracts as selectManyContracts;

type selectSingleEvents = (state: any, id: string) => ContractEvent[] | null;
type selectManyEvents = (state: any, ids?: string[]) => (ContractEvent[] | null)[];
export const selectEvents: selectSingleEvents | selectManyEvents = createSelector(orm.Network.events);
export const selectSingleEvents = selectEvents as selectSingleEvents;
export const selectManyEvents = selectEvents as selectManyEvents;

type selectLatestBlock = (state: any, id?: string) => Block | undefined;
export const selectLatestBlock: selectLatestBlock = (state, id) => {
    const blocks = selectSingleBlocks(state, id);
    if (!blocks || blocks.length == 0) return undefined;
    return maxBy(blocks, 'number');
};

type selectLatestBlockNumber = (state: any, id?: string) => number | null;
export const selectLatestBlockNumber: selectLatestBlockNumber = (state, id) => {
    const block = selectLatestBlock(state, id);
    if (!block) return null;

    return block.number;
};
