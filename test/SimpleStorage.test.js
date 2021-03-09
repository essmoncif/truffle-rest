const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
    var storageInstance;
    const owner = accounts[0];

    it("set value", () => {
        return SimpleStorage.deployed().then((instance) => {
            storageInstance = instance;
            return storageInstance.set(1997);
        }).then((receipt) => {
            const {logs} = receipt;
            assert.equal(logs[0].event, 'StorageSet');
            assert.equal(logs[0].args[0], 'Data stored successfully!!');
            return storageInstance.storedData();
        }).then((receipt) => {
            assert.equal(receipt, 1997);
        })
    })
})