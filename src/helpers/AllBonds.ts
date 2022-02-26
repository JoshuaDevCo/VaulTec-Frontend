import { StableBond, LPBond, NetworkID, CustomBond } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
// import { ReactComponent as OhmDaiImg } from "src/assets/tokens/OHM-DAI.svg";
import { ReactComponent as OhmDaiImg } from "src/assets/ohm/logo.svg";
import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as OhmFraxImg } from "src/assets/tokens/OHM-FRAX.svg";
import { ReactComponent as OhmLusdImg } from "src/assets/tokens/OHM-LUSD.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as LusdImg } from "src/assets/tokens/LUSD.svg";

import { abi as FraxOhmBondContract } from "src/abi/bonds/OhmFraxContract.json";
import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as BondOhmLusdContract } from "src/abi/bonds/OhmLusdContract.json";
import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveOhmLusdContract } from "src/abi/reserves/OhmLusd.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as ReserveOhmFraxContract } from "src/abi/reserves/OhmFrax.json";
import { abi as FraxBondContract } from "src/abi/bonds/FraxContract.json";
import { abi as LusdBondContract } from "src/abi/bonds/LusdContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";
// import ERC20 from "src/lib/ERC20";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "BUSD",
  displayName: "BUSD",
  bondToken: "BUSD",
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xe6c2F6bb2C9AC6114DD6491A5C6C3fD34d547c3F",
      reserveAddress: addresses[NetworkID.Mainnet].DAI_ADDRESS,
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
    },
  },
});

export const eth = new CustomBond({
  name: "bnb",
  displayName: "WBNB",
  bondToken: "WBNB",
  bondIconSvg: wETHImg,
  bondContractABI: EthBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x9A2E559bBe717497dD2cE9d83A463dcF7ea11790",
      reserveAddress: addresses[NetworkID.Mainnet].BNB_ADDRESS,
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice = await ethBondContract.assetPrice();
    ethPrice = ethPrice / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    ethAmount = ethAmount / Math.pow(10, 18);
    return ethAmount * ethPrice;
  },
});

export const VAULT = new CustomBond({
  name: "VAULT",
  displayName: "VAULT",
  bondToken: "VAULT",
  bondIconSvg: FraxImg,
  bondContractABI: FraxBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x4056B96c76F80b3bd9CCe2BdA5Ac85FF8b9C8372",
      reserveAddress: "0x2794553775D6c41f54641C464CdEF5037861A0Dd",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const FraxBondContract = this.getContractForBond(networkID, provider);
    let bourboncakePrice = await FraxBondContract.assetPrice();
    bourboncakePrice = bourboncakePrice / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let bourboncakeAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    bourboncakeAmount = bourboncakeAmount / Math.pow(10, 18);
    return bourboncakeAmount * bourboncakePrice;
  },
});

export const ohm_dai = new LPBond({
  name: "VAULT-BUSD",
  displayName: "VAULT-BUSD LP",
  bondToken: "VAULT-BUSD",
  bondIconSvg: OhmDaiImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x7F1b0Dab5C7c8d7a63758946f853049bC53f4306",
      reserveAddress: "0x8cc28A6400E7745193c7Da8e6081e108f897b461",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
   `https://pancakeswap.finance/add/${addresses[NetworkID.Mainnet].DAI_ADDRESS}/${addresses[NetworkID.Mainnet].PID_ADDRESS}`,
});

export const frax = new StableBond({
  name: "frax",
  displayName: "FRAX",
  bondToken: "FRAX",
  bondIconSvg: FraxImg,
  bondContractABI: FraxBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x8510c8c2B6891E04864fa196693D44E6B6ec2514",
      reserveAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xF651283543fB9D61A91f318b78385d187D300738",
      reserveAddress: "0x2F7249cb599139e560f0c81c269Ab9b04799E453",
    },
  },
});

export const lusd = new StableBond({
  name: "USDT",
  displayName: "USDT",
  bondToken: "USDT",
  bondIconSvg: LusdImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x1972f90FeD66a94708970c9Fee89438A53ef763F",
      reserveAddress: "0x55d398326f99059ff775485246999027b3197955",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x3aD02C4E4D1234590E87A1f9a73B8E0fd8CF8CCa",
      reserveAddress: "0x45754dF05AA6305114004358eCf8D04FF3B84e26",
    },
  },
});



export const ohm_frax = new LPBond({
  name: "BSHARE-BNB",
  displayName: "BSHARE-BNB LP",
  bondToken: "BSHARE-BNB",
  bondIconSvg: OhmFraxImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmFraxContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x3bF6A4943B8d43446D258E2800e30D6a880eA71A",
      reserveAddress: "0x23f882C3b2B7a8F5df94BaCb6386D5eB3250880f",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x7BB53Ef5088AEF2Bb073D9C01DCa3a1D484FD1d2",
      reserveAddress: "0x11BE404d7853BDE29A3e73237c952EcDCbBA031E",
    },
  },
  lpUrl:
    "https://pancakeswap.finance/add/BNB/0x37c3205E81D44770d6b9E5693094264C6aA4d6E1",
});

export const pid_lusd = new LPBond({
  name: "pid_lusd_lp",
  displayName: "OHM-LUSD LP",
  bondToken: "LUSD",
  bondIconSvg: OhmLusdImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmLusdContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x43B09D0d25836c915D75141427DCcd68A82202D3",
      reserveAddress: "0xfDf12D1F85b5082877A6E070524f50F6c84FAa6b",
    },
    [NetworkID.Testnet]: {
      // NOTE (appleseed-lusd): using ohm-dai rinkeby contracts
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://pancakeswap.finance/add/0x383518188C0C6d7730D91b2c03a03C837814a899/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
// export const allBonds = [dai, frax, eth, ohm_dai, ohm_frax, lusd, pid_lusd];

export const allBonds = [dai, VAULT]
// export const allBonds:LPBond[]=[]
export const treasuryBalanceAll = async ( networkID: NetworkID, provider: StaticJsonRpcProvider) => {
  return (await Promise.all(allBonds.map(async (item) => {
    // console.error(await item.getTreasuryBalance(networkID,provider))
    // console.error(item.name)
    return await item.getTreasuryBalance(networkID,provider)
  }))).reduce((total,num)=>total + num)
}

export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log({allBonds});
export default allBonds;
