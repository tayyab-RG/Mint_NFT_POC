import { useState } from 'react';
import mint from '../utils/mint';

import uploadToIPFS from '../utils/uploadToIPFS';
import getNFTs from '../utils/GetNFTs';

const createNFT = async (props) => {
    const metadata = {
        name: props.name,
        image: await uploadToIPFS(props.image)
    }
    return uploadToIPFS(metadata)
}

function FileUpload() {
    const [file, setFile] = useState("");
    const [NFTLink, setNFTLink] = useState("");
    const [ownerNFTs, setOwnerNFTs] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) return;

        setNFTLink("Loading");

        createNFT({
            name: "My-NFT",
            image: file
        }).then(res => {
            setNFTLink(res);
            mint(e.target.walletAddress.value, e.target.tokenID.value, res)
        });
    };

    const handleGetNFTs = (e) => {
        e.preventDefault();
        setOwnerNFTs("loading");
        getNFTs(e.target.walletAddress.value)
            .then((nfts) => setOwnerNFTs(nfts));
    };

    return (
        <div>
            <h1>Mint NFTs to given Wallet Address</h1>
            <form onSubmit={handleUpload}>
                <label>
                    Wallet Address:
                    <input type="text" name="walletAddress" />
                </label>
                <br />

                <label>
                    Token ID:
                    <input type="text" name="tokenID" />
                </label>
                <br />

                <label>
                    File:
                    <input type="file" name="NFTfile" onChange={handleFileChange} />
                </label>
                <br />
                <div>{file && `${file.name} - ${file.type}`}</div>

                <div>{NFTLink && (NFTLink === "loading" ? "NFT Link - Loading" : `NFT Link - ${NFTLink}`)}</div>

                <input type="submit" value="Upload" />

            </form >
            <hr />
            <h1>Get NFTs by Wallet address</h1>
            <form onSubmit={handleGetNFTs}>
                <label>
                    Wallet Address:
                    <input type="text" name="walletAddress" />
                </label>

                <input type="submit" value="Get NFTs" />
            </form>
            <div>
                {ownerNFTs
                    &&
                    (ownerNFTs === "loading" ? "Owner NFTs - Loading" : ownerNFTs.map(nft => {
                        return (
                            <div>
                                <b>Token ID</b> : <p>{nft.tokenId}</p>
                                <b>Token URI</b> : <p>{nft.tokenUri.raw}</p>
                                <hr />
                            </div>
                        );
                    }))
                }
            </div>
        </div>
    );
}

export default FileUpload;