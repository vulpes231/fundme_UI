import { connect } from "./utils/conn.js";

document.addEventListener("DOMContentLoaded", function () {
  const connectWallet = document.getElementById("connect-wallet");
  const getBalance = document.getElementById("get-bal");
  const fundContract = document.getElementById("fund");
  const withdrawFromContract = document.getElementById("withdraw");
  const myInput = document.getElementById("my-input");

  let val;
  let connected = false;

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

  getBalance.addEventListener("click", function (e) {
    e.preventDefault();
    val = myInput.value;
    console.log(!val ? 0 : val, "Get balance clicked");
    // console.log(val);
  });

  fundContract.addEventListener("click", function (e) {
    e.preventDefault();
    val = myInput.value;
    console.log(!val ? 0 : val, "Fund contract clicked");
  });

  withdrawFromContract.addEventListener("click", function (e) {
    e.preventDefault();
    val = myInput.value;
    console.log(!val ? 0 : val, "Withdraw  clicked");
  });
});
