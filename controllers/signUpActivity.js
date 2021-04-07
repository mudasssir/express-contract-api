import Web3 from "web3";
import dotenv from "dotenv/config.js";
import TX from "ethereumjs-tx";
const TXS = TX.Transaction;
import { ACTIVITY_REWARD } from "../abi/ActivityReward_ABI.js";

const rpcUrl = process.env.RPC_URL;
const MLM_ADDRESS = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(rpcUrl);
const mlmContract = new web3.eth.Contract(ACTIVITY_REWARD, MLM_ADDRESS);
const intitiatorAddress = process.env.INITIATOR_ADDRESS;
const privateKeyBuffer = Buffer.from(process.env.PRIVATE_KEY, "hex");

console.log(intitiatorAddress);

export const signUpActivity = async (req, res) => {
  let parentAddress = await req.body.parent;
  let childAddress = await req.body.child;

  try {
    let data = await mlmContract.methods
      .signUpActivity(parentAddress, childAddress)
      .encodeABI();
    web3.eth.getTransactionCount(intitiatorAddress, (error, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(3000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("20", "gwei")),
        to: MLM_ADDRESS,
        data: data,
      };

      const tx = new TXS(txObject);
      tx.sign(privateKeyBuffer);

      const serializeTx = tx.serialize();
      const raw = "0x" + serializeTx.toString("hex");
      web3.eth
        .sendSignedTransaction(raw, (err, txHash) => {
          console.log("err:", err, "txHash:", txHash);
          res.send(err);
        })
        .then((receipt) => {
          console.log(receipt);
          // res.send(receipt);
        });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  console.log(req.body.parent);
};
