// imports
import Web3 from "web3";
import abi from "../abi/abi_latest.json";

// exports
export default function mint(toAddress, tokenId, tokenURI) {

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

    if (typeof window.ethereum == "undefined") {
        alert("Pleaes install metamask for this transaction");
    }

    let web3 = new Web3(window.ethereum);

    var myContract = new web3.eth.Contract(
        abi,
        CONTRACT_ADDRESS
    );

    web3.eth.requestAccounts().then((accounts) => {
        if (accounts.length > 0) {
            const baseURI = tokenURI.split('/ipfs/')[0] + "/ipfs/";

            myContract.methods.setBaseURI(baseURI).send({ from: accounts[0] }).then((data) => console.log("base uri data:", data))

            myContract.methods
                .mint(toAddress, tokenId, tokenURI.split('/ipfs/')[1])
                .send({
                    from: accounts[0],
                })
                .then((data) => {
                    alert(data);
                });
            // myContract.methods.owner().send({ from: accounts[0] }).then((data) => console.log("data:", data))
        } else {
            alert("no wallet connected.")
        }

    });
}