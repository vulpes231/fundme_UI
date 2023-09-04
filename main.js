import { connect } from "./utils/conn.js";

document.addEventListener("DOMContentLoaded", function () {
  const connectWallet = document.getElementById("connect-wallet");
  const getBalance = document.getElementById("get-bal");
  const fundContract = document.getElementById("fund");
  const withdrawFromContract = document.getElementById("withdraw");
  const myInput = document.getElementById("my-input");

  let val;

  connectWallet.addEventListener("click", function (e) {
    e.preventDefault();
    connect();
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
