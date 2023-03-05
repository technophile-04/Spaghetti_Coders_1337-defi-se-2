import { NextPage } from "next";
import Head from "next/head";
import { db } from "../Config/Firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Context } from "~~/Context/ContextProvider";
import { useRouter } from "next/router";
import { SpinnerCircular } from "spinners-react";
const Admin: NextPage = () => {
  const { user } = useContext(Context);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const data = [
  //   {
  //     id: "1",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
  //     name: "Leander",
  //     age: "20",
  //     aadhar_no: "6009 2345 8902 1234",
  //     gender: "Male",
  //   },
  //   {
  //     id: "2",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
  //     name: "Shiv",
  //     age: "20",
  //     aadhar_no: "6029 2345 8912 1244",
  //     gender: "Male",
  //   },
  //   {
  //     id: "3",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
  //     name: "Aadil",
  //     age: "20",
  //     aadhar_no: "6239 2325 8952 1238",
  //     gender: "Male",
  //   },
  //   {
  //     id: "4",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
  //     name: "Ayush",
  //     age: "20",
  //     aadhar_no: "6209 2345 8942 1239",
  //     gender: "Male",
  //   },
  //   {
  //     id: "5",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
  //     name: "Knock",
  //     age: "20",
  //     aadhar_no: "6209 2545 8952 1934",
  //     gender: "Male",
  //   },
  // ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (user?.isAdmin !== true) {
          router.push("/");
        }
        const userDoc = collection(db, "users");
        const users = await getDocs(userDoc);
        const filteredData = users.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("filtered Data", filteredData);
        const filteredUsers = filteredData.filter(user => user?.kycCompleted === false);
        console.log("filteredUsers ", filteredUsers);
        setUsers([...filteredUsers]);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  // console.log("users ", users);

  const acceptHandler = async id => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {
      kycCompleted: true,
    });

    setUsers(users => {
      return users.filter(user => {
        return user.id !== id;
      });
    });
    console.log("KYC completed");
    toast.success("KYC completed");
  };

  const rejectHandler = async id => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);

    setUsers(users => {
      return users?.filter(user => {
        return user?.id !== id;
      });
    });
    console.log("KYC reject");
    toast.success("KYC reject");
    console.log("users after rejection ", users);
  };
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="md:flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Admin</span>
          </h1>

          <div className="overflow-x-auto md:w-full ">
            {loading ? (
              <table className="table border w-fit">
                {/* head */}
                <thead>
                  <tr className="border">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Aadhar Number</th>
                    <th>Address</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* row 1 */}
                  {users?.map(d => (
                    <tr key={d?.id} className="border border-b-[1.5px]">
                      <td>
                        <label htmlFor="my-modal-6" className="flex items-center space-x-3">
                          <div className="mask cursor-pointer mask-squircle ">
                            <img className="w-12 h-12" src={d?.aadharPath} alt="profile" />
                          </div>
                        </label>
                      </td>
                      <td>{d?.name}</td>
                      <td>{d?.aadharNumber}</td>
                      <td>{d?.address}</td>
                      {/* <td>{d.age}</td>
                    <td>{d.gender}</td> */}
                      <td>
                        <div className="flex space-x-[10px]">
                          <button
                            className="btn"
                            onClick={() => {
                              acceptHandler(d?.id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              rejectHandler(d?.id);
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                      <td>
                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                        <div className="modal modal-middle">
                          <div className="modal-box">
                            <div className="flex justify-end mb-[10px]">
                              <label htmlFor="my-modal-6" className="text-[30px] cursor-pointer">
                                X
                              </label>
                            </div>
                            <img className="w-full" src={d?.aadharPath} alt="Profile" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
