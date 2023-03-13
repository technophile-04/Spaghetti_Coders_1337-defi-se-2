import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaucetButton } from "~~/components/scaffold-eth";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { Bars3Icon, ArrowPathIcon, BanknotesIcon, UserIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { db } from "../Config/Firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Context } from "~~/Context/ContextProvider";
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:bg-secondary py-1.5 px-3 text-sm rounded-full gap-2`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setUser, user } = useContext(Context);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );
  const { address } = useAccount();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const userDoc = collection(db, "users");
        const users = await getDocs(userDoc);
        const filteredData = users.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        // console.log("filtered Data", filteredData);
        const filteredUser = filteredData.filter(user => user?.address === address);
        if (filteredUser) {
          setUser(filteredUser[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAuth();
  }, [address, setUser]);

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/swap">
          <ArrowPathIcon className="h-4 w-4" />
          Swap
        </NavLink>
      </li>
      <li>
        <NavLink href="/lend-borrow">
          <BanknotesIcon className="h-4 w-4" />
          Lend / Borrow
        </NavLink>
      </li>
      {!user?.kycCompleted && (
        <li>
          <NavLink href="/kyc">
            <ClipboardDocumentIcon className="h-4 w-4" />
            KYC
          </NavLink>
        </li>
      )}
      {user && user?.isAdmin && (
        <li>
          <NavLink href="/admin">
            <UserIcon className="h-4 w-4" />
            Admin
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden cursor-pointer dropdown" ref={burgerMenuRef}>
          <button
            className={`ml-1 btn btn-ghost cursor-pointer ${
              isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
            }`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon
              tableValues={0}
              className="h-1/2"
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            />
          </button>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <Link href="/" passHref className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">DeFi Lego ❤️</span>
            <span className="text-xs">All in one DeFi Lego</span>
          </div>
        </div>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
}
