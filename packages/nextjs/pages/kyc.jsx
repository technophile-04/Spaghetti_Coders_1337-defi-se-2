import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Context } from "~~/Context/ContextProvider";
import { useRouter } from "next/router";

const Kyc = () => {
  const [name, setName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { user } = useContext(Context);
  const router = useRouter();
  // upload image to ipfs //
  useEffect(() => {
    console.log("user?.kycCompleted ", user);
    if (user?.kycCompleted === true) {
      router.push("/");
    }
  }, []);

  const imageUpload = async e => {
    const file = e.target.files[0];
    console.log("file ", file);
    console.log("process.env.NEXT_PUBLIC_PINATA_KEY  ", process.env.NEXT_PUBLIC_PINATA_KEY);
    console.log("process.env.NEXT_PUBLIC_PINATA_SECRET ", process.env.NEXT_PUBLIC_PINATA_SECRET);
    try {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "content-type": "multipart/form-data",
        },
      });
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      setImages(imageUrl);
      setLoading(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.log("error ", error);
    }
  };
  const submit = async e => {
    e.preventDefault();
    try {
      const userCollectionRef = collection(db, "users");

      await addDoc(userCollectionRef, {
        name: name,
        isAdmin: false,
        kycCompleted: false,
        aadharNumber: aadharNumber,
        aadharPath: images,
        address: address,
      });
      toast.success("Kyc uploaded successfully");
      setAadharNumber("");
      setName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title className="font-black ">Kyc</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Kyc</span>
          </h1>
        </div>
        <form onSubmit={submit} className="card p-[10px] space-y-[20px] md:w-96 bg-base-100 shadow-xl">
          <h1 className="mt-[20px] font-black mx-[5px]">Enter Your Name</h1>
          <div className="rounded-lg p-1 border-2 border-base-300">
            <div className="form-control grow">
              <div className="flex w-full items-center">
                <input
                  // name={name}
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                />
              </div>
            </div>
          </div>
          <h1 className="mt-[20px] font-black mx-[5px]">Enter Your Aadhar Number</h1>
          <div className="rounded-lg p-1 border-2 border-base-300">
            <div className="form-control grow">
              <div className="flex w-full items-center">
                <input
                  required
                  value={aadharNumber}
                  onChange={e => setAadharNumber(e.target.value)}
                  type="text"
                  placeholder="Enter aadhar number"
                  className="input input-ghost pl-1 focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] border w-full font-medium placeholder:text-accent/50 text-gray-400 grow"
                />
              </div>
            </div>
          </div>
          <h1 className="mt-[20px] font-black mx-[5px]">Upload your Aadhar card copy</h1>
          {!loading ? (
            <label className="flex justify-center" htmlFor="upload">
              {images.length === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              ) : (
                <CheckIcon className="h-12" />
              )}
            </label>
          ) : (
            <SpinnerCircular
              size="90"
              className=" mx-auto"
              thickness="100"
              speed="600"
              color="white"
              secondaryColor="black"
            />
          )}

          <div>
            <input
              required
              accept="image/png, image/gif, image/jpeg"
              type="file"
              hidden
              id="upload"
              onChange={imageUpload}
            />
          </div>
          <div className="my-[10px] w-full">
            <button className="btn btn-primary w-full font-black">Upload</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Kyc;
