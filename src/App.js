import { useEffect, useState } from 'react';
import './App.css';
import Deploy from './Deploy.js'
import Test from './Components/Test'
import Model from './Components/Model';
import DeployContract from './Components/DeployContract';

function App() {

  const [openModal, setOpenModal] = useState(false)

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect( () =>{
    if(window.ethereum){
      setIsWalletInstalled(true);
    }
  }, []);

      const connectWallet = async() => {
        window.ethereum.request({ method:"eth_requestAccounts"})
        .then( (accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })
        
      }

    if(account === null){
      return(
        <div className="App">{
          isWalletInstalled? (<button onClick={connectWallet}> Connect </button>) : (
            <p>Install Metamask Wallet</p>
          )
        }
        </div>
      )
    }
    else {

      return(
        <div className="App">
          <p> Connected as : {account}</p>
          {/* <Deploy/>  It's having some get Num details(First test Contract) */}
          {/* <Test/>   This is the final stuff*/}

          <DeployContract />
        </div>
      )
    }

}

export default App;