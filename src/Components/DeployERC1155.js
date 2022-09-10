import { ethers } from 'ethers'
import React from 'react'
import { ERC1155ABI, ERC1155Bytecode } from './Constants';

function deployERC1155() {

    const [name, setName]= useState()
    const [symbol, setSymbol]= useState()
    const [baseUri, setbaseUri]= useState()

    function Getname(e){
        console.log(e.target.value)
        setName(e.target.value)
    }
    function Getsymbol(e){
        console.log(e.target.value)
        setSymbol(e.target.value)
    }
    function GetbaseUri(e){
        console.log(e.target.value)
        setbaseUri(e.target.value)
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    // const contractInstance = new ethers.Contract('0x180e906999F0Bc18E181c9c196932c04732568AA',ABI, signer)

    async function deployContract(){

        const ERC1155Deploy = new ethers.ContractFactory(ERC1155ABI, ERC1155Bytecode,signer)
        const contract = await ERC1155Deploy.deploy(name, symbol, baseUri);
        console.log("address- ", contract.address)
    }

    // Uploading files to IPFS
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'

    const uploadNFTContent = async(inputFile)  =>{
        const nftStorage = new NFTStorage({token: API_KEY,})
    
        try {
            const metaData = await nftStorage.store({
                name:" Contract Deployment",
                description: `ERC1155 contract deployment`,
                image:inputFile
                
            });
    
            setMetaDataURl(getIPFSGatewayURL(metaData.url));
            // console.log("Metadata:- ", metaData);
            previewNFT(metaData)
            MetaTrx(metaData)
            return metaData
        } catch (error) {
            alert(error)
        }
      }


  return (
    <div>
        <h2> Deployning the 1155 with along uploading image</h2>

        <br />
        <h3>Enter Name</h3>
        <input type="text" placeholder='Enter Collection Name' onChange={Getname}/>
        <input type="text" placeholder='Symbol' onChange={Getsymbol}/>
        <input type="text" placeholder='BaseUri' onChange={GetbaseUri} />
    </div>
  )
}

export default deployERC1155