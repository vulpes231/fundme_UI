export async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await connectAcct();
    console.log("Connected..");
  }
}

async function connectAcct() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}
