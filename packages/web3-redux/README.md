# Web3 Redux
Core Redux Library. See [README.md](../../README.md) for more info.


## Models
In total we have 13 data models.
### Simple Primary Key
These models have a single id as a primary key.
* `4Byte`: `signatureHash`
* `Config`: `id`
* `ContractSend`: `uuid` generated randomly
* `Error`: `id`
* `HTTPCache`
* `IPFSCache`
* `Network`: `networkId`
* `Sync`

### Compound Primary Key
These models use a compound primary key that is computed based on multiple properties.
* `Block`: `[networkId+blockNumber]`
* `Contract`: `[networkId+address]`
* `ContractEvent`: `[networkId+blockNumber+logIndex]`
* `EthCall`: `[networkId+to+data]`
* `Transaction`: `[networkId+hash]`

## IndexedDB
### Compound Index
https://dexie.org/docs/Compound-Index
https://stackoverflow.com/questions/23806635/searching-for-compound-indexes-in-indexeddb
https://stackoverflow.com/questions/16501459/javascript-searching-indexeddb-using-multiple-indexes
### MultiEntry Index
https://dexie.org/docs/MultiEntry-Index

### IndexedDB Limitations
https://dexie.org/docs/The-Main-Limitations-of-IndexedDB

## TODO
* getBalance/getNonce... hook tests
* useEvents hook test
* useEvents pagination
* component integrations (table, display)
* ContractEvent getPastEvents query cache
