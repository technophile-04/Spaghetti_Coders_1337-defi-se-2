import { NextPage } from "next";
import Head from "next/head";

const Admin: NextPage = () => {
  const data = [
    {
      id: "1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
      name: "Leander",
      age: "20",
      aadhar_no: "6009 2345 8902 1234",
      gender: "Male",
    },
    {
      id: "2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
      name: "Shiv",
      age: "20",
      aadhar_no: "6029 2345 8912 1244",
      gender: "Male",
    },
    {
      id: "3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
      name: "Aadil",
      age: "20",
      aadhar_no: "6239 2325 8952 1238",
      gender: "Male",
    },
    {
      id: "4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
      name: "Ayush",
      age: "20",
      aadhar_no: "6209 2345 8942 1239",
      gender: "Male",
    },
    {
      id: "5",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
      name: "Knock",
      age: "20",
      aadhar_no: "6209 2545 8952 1934",
      gender: "Male",
    },
  ];
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
            <table className="table w-fit">
              {/* head */}
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Aadhar Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data.map(d => (
                  <tr>
                    <td>
                      <label htmlFor="my-modal-6" className="flex items-center space-x-3">
                        <div className="mask cursor-pointer mask-squircle w-12 h-12">
                          <img src={d.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </label>
                    </td>
                    <td>{d.name}</td>
                    <td>{d.aadhar_no}</td>
                    <td>{d.age}</td>
                    <td>{d.gender}</td>
                    <td>
                      <div className="flex space-x-[10px]">
                        <button className="btn">Accept</button>
                        <button className="btn">Reject</button>
                      </div>
                    </td>
                    <td>
                      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                      <div className="modal modal-middle md:modal-bottom sm:modal-middle">
                        <div className="modal-box">
                          <div className="flex justify-end mb-[10px]">
                            <label htmlFor="my-modal-6" className="text-[30px] cursor-pointer">
                              X
                            </label>
                          </div>
                          <img className="w-full" src={d.image} alt="Profile" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
