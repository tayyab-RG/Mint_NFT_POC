import { Network, Alchemy } from "alchemy-sdk";

const GetNFTs = async (address) => {

    const NFTs = [];

    const alchemy = new Alchemy({
        apiKey: process.env.REACT_APP_API_KEY,
        network: Network.MATIC_MUMBAI
    });

    const ownerNFTs = await alchemy.nft.getNftsForOwner(address);

    ownerNFTs.ownedNfts.forEach(nft => {
        NFTs.push(nft);
    });
    return NFTs;
}

export default GetNFTs;