const MoodContractAddress = "0x658A270e196E20711B4244E97bB6f64A2c133Ac4";
const MoodContractABI = [
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let MoodContract;
let signer;
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

async function getMood() {
  document.getElementById("current-mood").innerHTML = "";
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
  document.getElementById("current-mood").innerHTML = Mood;
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
}
