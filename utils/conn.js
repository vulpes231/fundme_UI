import { ethers } from "../ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../constants.js";

const amount = document.getElementById("my-input");
const errorEl = document.querySelector(".error");
const successEl = document.querySelector(".success");

export async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected..");
    } catch (error) {
      console.log(error);
    }
  }
}

export async function fund(ethAmount) {
  if (!amount.value) {
    amount.style.border = "2px solid red";
    errorEl.textContent = "Enter a valid ETH amount!";
    errorEl.style.display = "block";
    setTimeout(() => {
      errorEl.style.display = "none";
    }, 2000);
  } else {
    ethAmount = amount.value;

    console.log(`Funding with ${ethAmount} ETH...`);

    if (typeof window.ethereum !== "undefined") {
      try {
        // provider or connection to blockchain or net
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // wallet or signer
        const signer = provider.getSigner();
        console.log(signer);

        // contract with abi and address
        const myContract = new ethers.Contract(contractAddress, abi, signer);

        try {
          const txRes = await myContract.fund({
            value: ethers.utils.parseEther(ethAmount),
          });

          await listenForTxMine(txRes, provider);
          console.log("Funded  succesfully!");
          successEl.textContent = `Contract funded succesfully with ${ethAmount} ETH!`;
          successEl.style.display = "block";
          amount.value = "";
          amount.style.border = "2px solid green";
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export async function getContractBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bal = await provider.getBalance(contractAddress);

    const walletBal = ethers.utils.formatEther(bal);
    return walletBal;
  }
}

export async function withdrawEth() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myContract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txRes = await myContract.withdraw();
      await listenForTxMine(txRes, provider);
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTxMine(txRes, provider) {
  console.log(`Mining ${txRes.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(txRes.hash, (txReceipt) => {
      console.log(`Completed with ${txReceipt.confirmations} confirmation`);
      resolve();
    });
  });
}
