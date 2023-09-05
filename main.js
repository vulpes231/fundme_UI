import {
  connect,
  fund,
  getContractBalance,
  withdrawEth,
} from "./utils/conn.js";

// getBalance

document.addEventListener("DOMContentLoaded", function () {
  const connectWallet = document.getElementById("connect-wallet");
  const getBalance = document.getElementById("get-bal");
  const fundContract = document.getElementById("fund");
  const withdrawFromContract = document.getElementById("withdraw");
  const myInput = document.getElementById("my-input");
  const balEl = document.querySelector(".bal");

  let val;
  let connected = false;
  let ethAmount;

  connectWallet.textContent = "Connect wallet";

  connectWallet.addEventListener("click", async function (e) {
    e.preventDefault();
    await connect(connected);
    connected = true;
    if (connected === true) {
      connectWallet.textContent = "Connected";
      connectWallet.style.backgroundColor = "blue";
    } else {
      connectWallet.textContent = "Connect wallet";
    }
  });

  getBalance.addEventListener("click", async function (e) {
    e.preventDefault();
    const bal = await getContractBalance();
    balEl.textContent = `Your contract balance: ${bal} ETH `;
  });

  fundContract.addEventListener("click", function (e) {
    e.preventDefault();
    fund(ethAmount);
  });

  withdrawFromContract.addEventListener("click", async function (e) {
    e.preventDefault();
    await withdrawEth();
    console.log("Funds withdrawn");
  });
});
