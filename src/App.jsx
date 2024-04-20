import { useState } from 'react';
import Web3 from 'web3';
import LotteryContract from './contract/Lottery.json'; // Import the JSON file of your lottery contract
import lotteryContract from './contract/lottery';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [lotteryId, setLotteryId] = useState(1);
  const [winner, setWinner] = useState(null);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
        const lc = lotteryContract(web3Instance); // Pass web3Instance instead of web3
        setContract(lc);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 not found');
    }
  };
  
  

  

  const enterLottery = async () => {
    try {
      await contract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.002', 'ether') });
    } catch (error) {
      console.error(error);
    }
  };

  const pickWinner = async () => {
    try {
      await contract.methods.pickWinner().send({ from: accounts[0] });
      const winnerAddress = await contract.methods.getWinnerByLottery(lotteryId).call();
      setWinner(winnerAddress);
      setLotteryId(lotteryId + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Lottery App</h1>
        {web3 ? (
          <div>
            <p className="mb-4">Connected: {accounts[0]}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={enterLottery}
            >
              Enter Lottery
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={pickWinner}
            >
              Pick Winner
            </button>
            {winner && <p className="mt-4">Winner: {winner}</p>}
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
