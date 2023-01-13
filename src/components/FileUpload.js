import { useState } from 'react';
import mint from '../utils/mint';

import uploadToIPFS from '../utils/uploadToIPFS';

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

    return (
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

            <button onClick={() => mint("", "", "")}>Mint</button>
            <input type="submit" value="Upload" />

        </form >
    );
}

export default FileUpload;