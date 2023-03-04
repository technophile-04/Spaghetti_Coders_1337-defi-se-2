import { NextPage } from "next";
import Head from "next/head";

const Kyc: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kyc</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Kyc</span>
          </h1>
        </div>
      </div>
    </>
  );
};
export default Kyc;
