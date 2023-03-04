import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DeFi Lego</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center justify-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-2">
            <span className="block text-2xl md:text-6xl mb-2">Welcome to DeFi Lego ❤️</span>
          </h1>
        </div>
        <div className="px-12 lg:px-80 text-center"><p>A website that enables decentralized financial transactions, allowing users to exchange cryptocurrencies, lend and borrow digital assets, and earn interest on their holdings without intermediaries such as banks. It provides a peer-to-peer network that operates transparently, securely, and autonomously through smart contracts on a blockchain.</p>
        </div>
        
      </div>
    </>
  );
};

export default Home;
