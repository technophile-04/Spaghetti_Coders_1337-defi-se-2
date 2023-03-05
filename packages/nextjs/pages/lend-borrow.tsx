import { CheckIcon } from "@heroicons/react/24/solid";
import { BigNumber, ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export type TRetrivedData = {
  amount: BigNumber;
  borrower: string;
  fullAmount: BigNumber;
  interest: BigNumber;
  lender: string;
  requiredDeposit: BigNumber;
  status: BigNumber;
};

const LendBorrow: NextPage = () => {
  const { data: retrivedData } = useScaffoldContractRead("Loan", "retrieveLoans", [1], {
    watch: true,
  });
  console.log("⚡️ ~ file: lenjd-borrow.tsx:10 ~ retrivedData:", retrivedData);
  const { writeAsync: createLoanWrite } = useScaffoldContractWrite(
    "Loan",
    "createLoan",
    [2, "0xf9c4431117bFEAb931CBa8cb19d73B08B618181A", 80],
    "1",
  );
  return (
    <>
      <Head>
        <title>Lend / Borrow</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="md:flex p-[20px] flex-col xl:flex-row justify-center xl:space-y-0 space-y-[20px] xl:space-x-[20px] items-center pt-10">
        <div className="flex flex-col space-y-[20px]">
          <div className="card border shadow-xl">
            <h1 className="m-[20px] mb-1 font-extrabold">Your supplies</h1>
            <p className="m-[20px] mt-1">
              {" "}
              {retrivedData ? `${ethers.utils.formatEther(retrivedData.amount)} ETH` : "-"}
            </p>
          </div>

          <div className="flex lg:space-x-[20px]">
            <div className="card border shadow-xl">
              <h1 className="m-[20px] font-extrabold">Pay loan</h1>
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
                    <tr className="border border-b-[1.5px]">
                      <td className="text-center">{"Hello"}</td>
                      <td className="text-center">{0}</td>
                      <td className="text-center">{2}%</td>
                      <td>
                        <CheckIcon className="h-6 w-full" />
                      </td>
                      <td>
                        <button className="btn">Supply</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-[20px]">
          <div className="card border shadow-xl">
            <h1 className="m-[20px] mb-1 font-extrabold">Your borrows</h1>
            <p className="m-[20px] mt-1">Nothing borrowed yet</p>
          </div>

          <div className="flex lg:space-x-[20px] rounded-lg">
            <div className="card border shadow-xl">
              <h1 className="m-[20px] font-extrabold">Assets to supply</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border">
                      <th className="text-center">Address</th>
                      <th className="text-center">Amount needed</th>
                      <th className="text-center">Max interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-b-[1.5px]">
                      <td className="text-center">
                        <Address address="0xf9c4431117bFEAb931CBa8cb19d73B08B618181A" />
                      </td>
                      <td className="text-center">1</td>
                      <td className="text-center">{2}%</td>
                      <td>
                        <button onClick={async () => await createLoanWrite()} className="btn">
                          Supply
                        </button>
                      </td>
                    </tr>
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
