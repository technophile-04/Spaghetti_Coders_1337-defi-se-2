import { MinusSmallIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Head from "next/head";

const LendBorrow: NextPage = () => {
  const data = [
    {
      id: "1",
      name: "AAVE",
      Ballance: "0",
      APY: "2.7",
      Collateral: true,
    },
    {
      id: "2",
      name: "DAI",
      Ballance: "3",
      APY: "3.3",
      Collateral: false,
    },
    {
      id: "3",
      name: "USDC",
      Ballance: "2",
      APY: "0",
      Collateral: true,
    },
    {
      id: "4",
      name: "USDT",
      Ballance: "0",
      APY: "8.6",
      Collateral: false,
    },
    {
      id: "5",
      name: "LINK",
      Ballance: "2",
      APY: "2.4",
      Collateral: true,
    },
    {
      id: "4",
      name: "USDT",
      Ballance: "0",
      APY: "8.6",
      Collateral: false,
    },
    {
      id: "5",
      name: "LINK",
      Ballance: "2",
      APY: "2.4",
      Collateral: true,
    },
  ];
  return (
    <>
      <Head>
        <title>Lend / Borrow</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="md:flex p-[20px] flex-col xl:flex-row justify-center xl:space-y-0 space-y-[20px] xl:space-x-[20px] items-center pt-10">
        <div className="flex flex-col space-y-[20px]">
          <div className="card border shadow-xl">
            <h1 className="m-[20px] font-extrabold">Your supplies</h1>
            <p className="m-[20px] ">Nothing supplied yet</p>
          </div>

          <div className="flex lg:space-x-[20px]">
            <div className="card border shadow-xl">
              <h1 className="m-[20px] font-extrabold">Assets to supply</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border">
                      <th className="text-center">Assets</th>
                      <th className="text-center">Wallet Balance</th>
                      <th className="text-center">APY</th>
                      <th className="text-center">Collaterall</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(d => (
                      <tr className="border border-b-[1.5px]">
                        <td className="text-center">{d.name}</td>
                        <td className="text-center">{d.Ballance}</td>
                        <td className="text-center">{d.APY}%</td>
                        {d?.Collateral ? (
                          <td>
                            <CheckIcon className="h-6 w-full" />
                          </td>
                        ) : (
                          <td>
                            <MinusSmallIcon className="h-6 w-full" />
                          </td>
                        )}
                        <td>
                          <button className="btn">Supply</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-[20px]">
          <div className="card border shadow-xl">
            <h1 className="m-[20px] font-extrabold">Your borrows</h1>
            <p className="m-[20px] ">Nothing borrowed yet</p>
          </div>

          <div className="flex lg:space-x-[20px] rounded-lg">
            <div className="card border shadow-xl">
              <h1 className="m-[20px] font-extrabold">Assets to supply</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border">
                      <th className="text-center">Assets</th>
                      <th className="text-center">Available</th>
                      <th className="text-center">APY,variable</th>
                      <th className="text-center">APY,stable</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(d => (
                      <tr className="border border-b-[1.5px]">
                        <td className="text-center">{d.name}</td>
                        <td className="text-center">{d.Ballance}</td>
                        <td className="text-center">{d.APY}%</td>
                        {d?.Collateral ? (
                          <td>
                            <CheckIcon className="h-6 w-full " />
                          </td>
                        ) : (
                          <td>
                            <MinusSmallIcon className="h-6 w-full" />
                          </td>
                        )}
                        <td>
                          <button className="btn">Borrow</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LendBorrow;
