import { ethers } from 'ethers';
import React, { useState } from 'react'
import {NFTStorage} from 'nft.storage'
import { ERC1155ABI, ERC1155Bytecode } from './Constants';



function DeployERC1155({open}) {

    const [name, setName]= useState()
    const [symbol, setSymbol]= useState()
    const [imgName, setImgName]= useState()
    const [uploadFile ,setUploadFile] = useState()

    if(!open){
        <h2>Heading</h2>
    }
    else{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)

    // const [uploadFile ,setUploadFile] = useState()// pasted at the top


//   Uploadig NFT data to IPFS
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'

const uploadNFTContent = async(inputFile)  =>{
    const nftStorage = new NFTStorage({token: API_KEY,})

    try {
        const metaData = await nftStorage.store({
            name:imgName,
            description: `Profile Image`,
            image:inputFile
            
        });
        // console.log("link is :- ",(metaData.url))        
        // previewNFT(metaData)
        deployContract(metaData.url)
        return metaData
    } catch (error) {
        alert(error)
    }
  }

  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const mintNFTToken = async(event , uploadedFile) =>{
    event.preventDefault()
    const metadata = await uploadNFTContent(uploadFile)
  }

  const deployContract = async (metaData) => {
        const factory = new ethers.ContractFactory(ERC1155ABI, ERC1155Bytecode, signer)
        const contract = await factory.deploy(metaData, name, symbol );
        console.log("address- ", contract.address)
        window.alert(`contract depolyed at ${contract.address}`)
        // console.log("ipfsMetada:- ", metaData)
        
  }

  // Taking the contract information from the user
  // Pasted useState at the top
    // const [name, setName]= useState()
    // const [symbol, setSymbol]= useState()
    // const [imgName, setImgName]= useState()

    function Getname(e){
        console.log(e.target.value)
        setName(e.target.value)
    }
    function Getsymbol(e){
        console.log(e.target.value)
        setSymbol(e.target.value)
    }
    function ImgName(e){
        console.log(e.target.value)
        setImgName(e.target.value)
    }


    return (
    <div>
        <h1>ERC1155 contract deployment</h1>

        <form className='form'>
              <label className='label1' htmlFor="chooseFile">Upload NFT image
              <input className='fileUpload' type="file" id='chooseFile' onChange={handleFileUpload}/>
              </label>
        </form>

        <br />
        <h3>Enter Name</h3>
        <input type="text" placeholder='Enter Collection Name' onChange={Getname}/>
        <input type="text" placeholder='Symbol' onChange={Getsymbol}/>
        <input type="text" placeholder='Image Name' onChange={ImgName} />
        <br />
        <br />
        <button onClick={mintNFTToken}>Deploy Contract</button>
    </div>
  )
}
}

export default DeployERC1155 