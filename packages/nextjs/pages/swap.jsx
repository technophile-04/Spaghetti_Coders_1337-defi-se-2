import Head from "next/head";
import { useState } from "react";

const Swap = () => {
  const [tokenName1, setTokenName1] = useState("ETH");
  const [tokenName2, setTokenName2] = useState("DAI");
  const [tokenValue1, setTokenValue1] = useState("");
  const [tokenValue2, setTokenValue2] = useState("");
  const handleFirstSelect = e => {
    if (e.target.value === "ETH") {
      setTokenName1("ETH");
      setTokenName2("DAI");
    } else {
      setTokenName1("DAI");
      setTokenName2("ETH");
    }
  };

  const handleSecondSelect = e => {
    if (e.target.value === "ETH") {
      setTokenName1("DAI");
      setTokenName2("ETH");
    } else {
      setTokenName1("ETH");
      setTokenName2("DAI");
    }
  };

  return (
    <>
      <Head>
        <title>Swap</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Swap</span>
          </h1>
        </div>

        <div className="card p-[10px] space-y-[10px] w-96 bg-base-100 shadow-xl">
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
                <select onChange={handleFirstSelect} value={tokenName1} className="select bg-primary h-fit select-info">
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
                  placeholder="0.00"
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
            <button className="btn btn-primary w-full">Connect Wallet</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Swap;
