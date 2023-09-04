let connected = false;

export async function connect() {
  if (typeof window.ethereum !== "undefined") {
    if (connected === true) {
      console.log("Account connected already!");
    } else {
      connectAcct();
      connected = true;
    }
  }
}

function connectAcct() {
  window.ethereum.request({ method: "eth_requestAccounts" });
}
