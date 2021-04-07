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

export const balanceOf = async (req, res) => {
    let address = await req.body.address;
  
    try {
      mlmContract.methods.balanceOf(address).call((err, response) => {
        var result = response;
        res.send(`Balance ${result}`);
        console.log(result);
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
  