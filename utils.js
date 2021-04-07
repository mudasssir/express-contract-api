import bn  from'bn.js'
import HDWalletProvider  from'@truffle/hdwallet-provider'
import dotenv from "dotenv/config.js";

import Network  from'@maticnetwork/meta/network/index.js'
// import Matic  from'../lib/index'
// import Matic from '@maticnetwork/maticjs'
import pkg from '@maticnetwork/maticjs/lib/index.js'

const { Matic } = pkg

const { NETWORK } = Network

const SCALING_FACTOR = new bn(10).pow(new bn(18))

export async function getMaticClient(_network = 'testnet', _version = 'mumbai',req, res) {
  const network = new Network(_network, _version)
  const { from } = getAccount()
  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: new HDWalletProvider(process.env.PRIVATE_KEY, network.Main.RPC),
    maticProvider: new HDWalletProvider(process.env.PRIVATE_KEY, network.Matic.RPC),
    parentDefaultOptions: { from },
    maticDefaultOptions: { from },
  })
  await matic.initialize()
  return { matic, network }
  res.send(matic);
}

// function getAccount() {
//   if (!process.env.PRIVATE_KEY || !process.env.FROM) {
//     throw new Error('Please set the PRIVATE_KEY/FROM env vars')
//   }
//   return { privateKey: process.env.PRIVATE_KEY, from: process.env.FROM }
// }

// module.exports = {
//   SCALING_FACTOR,
//   getMaticClient,
//   getAccount,
// }
