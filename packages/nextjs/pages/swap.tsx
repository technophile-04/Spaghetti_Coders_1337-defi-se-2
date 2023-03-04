import { BigNumber, Contract, ethers } from "ethers";
import Head from "next/head";
import { useMemo, useState } from "react";
import { ChangeEvent } from "react";
import { useAccount, useContract, useProvider } from "wagmi";
import {
  useDeployedContractInfo,
  useNetworkColor,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";
import { NUMBER_REGEX } from "~~/components/scaffold-eth/Contract/utilsComponents";
import { Address, Balance } from "~~/components/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import {
  getAllContractFunctions,
  getContractVariablesAndNoParamsReadMethods,
} from "~~/components/scaffold-eth/Contract/utilsContract";
import Spinner from "~~/components/Spinner";

const Swap = ({ contractName = "Exchange" }) => {
  const [tokenName1, setTokenName1] = useState("ETH");
  const [tokenName2, setTokenName2] = useState("DAI");
  const [tokenValue1, setTokenValue1] = useState("0");
  const [tokenValue2, setTokenValue2] = useState("0");
  // ----------------------------------------------------
  const [tokenValue3, setTokenValue3] = useState("0");
  const [tokenValue4, setTokenValue4] = useState("0");

  // -------------------BS---------------------------------
  const configuredChain = getTargetNetwork();
  const provider = useProvider();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshDisplayVariables, setRefreshDisplayVariables] = useState(false);

  let contractAddress = "";
  let contractABI = [];
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const networkColor = useNetworkColor();
  if (deployedContractData) {
    ({ address: contractAddress, abi: contractABI } = deployedContractData);
  }

  const contract: Contract | null = useContract({
    address: contractAddress,
    abi: contractABI,
    signerOrProvider: provider,
  });

  const displayedContractFunctions = useMemo(() => getAllContractFunctions(contract), [contract]);

  const contractVariablesDisplay = useMemo(() => {
    return getContractVariablesAndNoParamsReadMethods(contract, displayedContractFunctions, refreshDisplayVariables);
  }, [contract, displayedContractFunctions, refreshDisplayVariables]);

  // --------------------BS-------------------------------

  const { address } = useAccount();

  // -----------WAGMI----------
  const { writeAsync: swapWrite } = useScaffoldContractWrite(
    "Exchange",
    "ethToTokenSwap",
    [NUMBER_REGEX.test(tokenValue2) ? ethers.utils.parseEther(tokenValue2) : undefined],
    NUMBER_REGEX.test(tokenValue1) ? tokenValue1 : undefined,
  );
  const { writeAsync: addLiquidityWrite } = useScaffoldContractWrite(
    "Exchange",
    "addLiquidity",
    [NUMBER_REGEX.test(tokenValue4) ? ethers.utils.parseEther(tokenValue4) : undefined],
    NUMBER_REGEX.test(tokenValue3) ? tokenValue3 : undefined,
  );

  const { writeAsync: approveTokenWrite } = useScaffoldContractWrite("DAI", "approve", [
    deployedContractData?.address,
    NUMBER_REGEX.test(tokenValue4) ? ethers.utils.parseEther(tokenValue4) : undefined,
  ]);

  const { data: daiBalance } = useScaffoldContractRead<BigNumber>("DAI", "balanceOf", [address], { watch: true });
  const { data: lpTokenBalance } = useScaffoldContractRead<BigNumber>("Exchange", "balanceOf", [address], {
    watch: true,
  });

  // -----------WAGMI----------

  // -----------ONCLICK HANDLES----------
  const handleFirstSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "ETH") {
      setTokenName1("ETH");
      setTokenName2("DAI");
    } else {
      setTokenName1("DAI");
      setTokenName2("ETH");
    }
  };

  const handleSecondSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "ETH") {
      setTokenName1("DAI");
      setTokenName2("ETH");
    } else {
      setTokenName1("ETH");
      setTokenName2("DAI");
    }
  };

  const handleSwap = async () => {
    await swapWrite();
    setRefreshDisplayVariables(prev => !prev);
  };

  const handleAddLiquidity = async () => {
    await approveTokenWrite();
    await addLiquidityWrite();
    setRefreshDisplayVariables(prev => !prev);
  };

  // -----------ONCLICK HANDLES---------

  if (deployedContractLoading) {
    return (
      <div className="mt-14">
        <Spinner width="50px" height="50px" />
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${configuredChain.name}"!`}
      </p>
    );
  }
  return (
    <>
      <Head>
        <title>Swap</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-8 px-6 lg:px-10 lg:gap-12 w-full my-0">
          {/* LEFT */}
          <div className="col-span-2 flex flex-col">
            <h1 className="text-center mb-4 mt-4 lg:mt-0">
              <span className="block text-2xl mb-1">Contract details</span>
            </h1>
            <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">{contractName}</span>
                  <Address address={contractAddress} />
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-sm">Balance:</span>
                    <Balance address={contractAddress} className="px-0 h-1.5 min-h-[0.375rem]" />
                  </div>
                </div>
              </div>
              {configuredChain && (
                <p className="my-0 text-sm">
                  <span className="font-bold">Network</span>:{" "}
                  <span style={{ color: networkColor }}>{configuredChain.name}</span>
                </p>
              )}
            </div>
            <div className="bg-base-300 rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-base-300">
              {contractVariablesDisplay.methods.length > 0 ? contractVariablesDisplay.methods : "No contract variables"}
            </div>
          </div>
          {/* Center*/}
          <div className="col-span-4 space-y-6">
            <h1 className="text-center mb-0">
              <span className="block text-2xl mb-1 mt-4 lg:mt-0">Swap</span>
            </h1>
            <div className="card p-[10px] space-y-[10px] bg-base-100 shadow-xl">
              <div className="rounded-lg p-1 border-2 border-base-300">
                <div className="form-control grow">
                  <div className="flex w-full items-center">
                    <input
                      // name={name}
                      value={tokenValue1}
                      onChange={e => setTokenValue1(e.target.value)}
                      type="text"
                      placeholder="0.00"
                      className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                      // value={displayValue}
                      // onChange={onChangeNumber}
                    />
                    <select
                      onChange={handleFirstSelect}
                      value={tokenName1}
                      className="select bg-primary h-fit select-info"
                    >
                      <option value="ETH">ETH</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-1 border-2 border-base-300">
                <div className="form-control grow">
                  <div className="flex w-full items-center">
                    <input
                      // name={name}
                      value={tokenValue2}
                      onChange={e => setTokenValue2(e.target.value)}
                      type="text"
                      placeholder="min amount"
                      className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                      // value={displayValue}
                      // onChange={onChangeNumber}
                    />
                    <select
                      onChange={handleSecondSelect}
                      value={tokenName2}
                      className="select bg-primary h-fit select-info"
                    >
                      <option value="ETH">ETH</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="my-[10px] w-full">
                {address ? (
                  <button className="btn btn-primary w-full" onClick={handleSwap}>
                    Swap
                  </button>
                ) : (
                  <button className="btn btn-primary w-full">Connect Wallet</button>
                )}
              </div>
            </div>
            <h1 className="text-center mb-8">
              <span className="block text-2xl mb-2 mt-4 lg:mt-0">Add Liquidity</span>
            </h1>
            <div className="card p-[10px] space-y-[10px] bg-base-100 shadow-xl">
              <div className="rounded-lg p-1 border-2 border-base-300">
                <div className="form-control grow">
                  <div className="flex w-full items-center">
                    <input
                      // name={name}
                      value={tokenValue3}
                      onChange={e => setTokenValue3(e.target.value)}
                      type="text"
                      placeholder="0.00"
                      className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                      // value={displayValue}
                      // onChange={onChangeNumber}
                    />
                    <div className="btn bg-primary h-fit text-white py-0 btn-sm border-none">ETH</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-1 border-2 border-base-300">
                <div className="form-control grow">
                  <div className="flex w-full items-center">
                    <input
                      value={tokenValue4}
                      onChange={e => setTokenValue4(e.target.value)}
                      type="text"
                      placeholder="min amount"
                      className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                    />

                    <div className="btn bg-primary h-fit text-white py-0 btn-sm border-none">DAI</div>
                  </div>
                </div>
              </div>
              <div className="my-[10px] w-full">
                {address ? (
                  <button className="btn btn-primary w-full" onClick={handleAddLiquidity}>
                    Add liquidity
                  </button>
                ) : (
                  <button className="btn btn-primary w-full">Connect Wallet</button>
                )}
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="col-span-2 space-y-6">
            <h1 className="text-center mb-0">
              <span className="block text-2xl mb-1 mt-4 lg:mt-0">My Balances</span>
            </h1>
            <div className="bg-base-300 rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-base-300 mt-6 lg:mt-0">
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg mb-0 break-all">ETH Balance</h3>
                </div>
                <div className="text-gray-500 font-medium flex flex-col items-start">
                  <Balance address={address} classNamesText="!text-lg" className="!-ml-2" />
                </div>
              </div>
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg mb-0 break-all">DAI Balance</h3>
                </div>
                {daiBalance ? (
                  <div className="text-gray-500 font-medium flex flex-col items-start">
                    {ethers.utils.formatEther(daiBalance)}
                  </div>
                ) : (
                  <div className="text-gray-500 font-medium flex flex-col items-start">Loading...</div>
                )}
              </div>
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg mb-0 break-all">LP Token Balance</h3>
                </div>
                {lpTokenBalance ? (
                  <div className="text-gray-500 font-medium flex flex-col items-start">
                    {ethers.utils.formatEther(lpTokenBalance)}
                  </div>
                ) : (
                  <div className="text-gray-500 font-medium flex flex-col items-start">Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Swap;
