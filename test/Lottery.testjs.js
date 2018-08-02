const Web3 = require('web3')
const ganache = require('ganache-cli')
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile')
const assert = require('assert')


let players ;
let contract ;

beforeEach(async()=>{
    players=await web3.eth.getAccounts()
    contarct=await web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode
    }).send({
        from:players[0],
        gas:'3000000'
    })
})

describe('测试智能合约',()=>{
    console.log("fsdaf")
  it('测试智能合约部署',async()=>{
      assert.ok(contract.options.address)
  })
    it('测试智能合约的投注方法',  async()=> {
        let bMoney = await contract.methods.getBalance().call()

        contract.methods.enter().send({
            from :players[1],
            value:'1000000000000000000',
            gas:'1000000'
        })
        let fMoney = await contract.methods.getBalance().call()
        assert.equal("1000000000000000000",fMoney-bMoney)
    });
    it('测试智能合约的投注错误方法',  async()=> {
        let flag = false
        try {
             await contract.methods.enter().send({
                from: players[1],
                value: "45345234523462",
                gas: '1000000'
            })
            flag = true
        } catch (e) {
            flag = false
        }
        assert.equal(false,flag)
    });
    it('测试彩票兑奖方法', async()=> {
        for (let i = 1; i < 5; i++) {
            await contract.methods.enter().send({
                from:players[i],
                value:'1000000000000000000',
                gas:'1000000'
            })
        }
        console.log(await contract.methods.getBalance().call())
        await contract.methods.pickWinner().send({
            from:players[0],
            gas:'1000000'
        })
        let lMoney = await contract.methods.getBalance().call()
        assert.equal(0,lMoney)
    });
})


//这么快就敲完了吗?呵呵
