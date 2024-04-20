import LotteryContract from "./Lottery.json"

const lotteryContract = web3 => {
    return new web3.eth.Contract(
        LotteryContract,
        "0x72a71e9a08b8aB65f0Cf944F5D3328a2De8d4E21"
    )
}

export default lotteryContract
