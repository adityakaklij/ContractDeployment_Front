import React from 'react'
import { ERC721ABI, ERC721Bytecode } from './Constants'
import { useState } from 'react'
import { ethers } from 'ethers'
import '../CSS/DeployContract.css'

function DeployERC721({open}) {

    const [name, setName]= useState()
    const [symbol, setSymbol]= useState()
    const [baseURI, setBaseURI]= useState()
    const [NFTSupply, setNFTSupply]= useState(10000)

    const [sendAdd, setSendAdd] = useState("0x056397760b973BfB921Bc10Be9DA5034B1e921d7")
    const [depAdd, serDepAdd] = useState("0x056397760b973BfB921Bc10Be9DA5034B1e921d7")

    if(!open){
        return null;
    }

    else{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)


//   Uploadig NFT data to IPFS
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'

  const deployContract = async () => {
        const factory = new ethers.ContractFactory(ERC721ABI, ERC721Bytecode, signer)
        const contract = await factory.deploy(baseURI, name, symbol, NFTSupply);
        console.log("address- ", contract.address)
        window.alert(`contract depolyed at ${contract.address}`)
        // console.log("ipfsMetada:- ", metaData)     
  }

  // Taking the contract information from the user
    function Getname(e){
        console.log(e.target.value)
        setName(e.target.value)
    }
    function Getsymbol(e){
        console.log(e.target.value)
        setSymbol(e.target.value)
    }
    function GetURI(e){
        console.log(e.target.value)
        setBaseURI(e.target.value)
    }
    function GetSupply(e){
        console.log(e.target.value)
        setNFTSupply(e.target.value)
    }

    function GetAdd(e){
        setSendAdd(e.target.value)
    }

    const contractInstance = new ethers.Contract(depAdd, ERC721ABI, signer);

    const mintNFTs = async() =>{
        const mint = await contractInstance.mintToAddress(sendAdd)
        await mint.wait()
        window.alert("NFTs mint succesfully :)")
    }


    return (
    <div className='deploy1155'>
        <h1 className='deploy1155Heading'>ERC721 contract deployment</h1>

        <br />
        <h3>Enter Details</h3>
        <input type="text" placeholder='Enter Collection Name' onChange={Getname}/>
        <input type="text" placeholder='Symbol' onChange={Getsymbol}/>
        <input type="text" placeholder='Base Uri' onChange={GetURI} />
        <input type="text" placeholder='Total Supply' onChange={GetSupply} />
        <br />
        <br />
        <button onClick={deployContract}>Deploy Contract</button>
        <br /><br />
        <br /><br />

        <input type="text" placeholder='Address' onChange={GetAdd}/>
        <button  onClick={mintNFTs}>Mint NFTs</button>
    </div>
  )

    }
}

export default DeployERC721