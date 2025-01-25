import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const response = await fetch(
          "http://localhost/kicksandfits/backend/fetching/users.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUsers(data.users); // Make sure you're setting 'users' key
          } else {
            console.log("Error: No users found");
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    handlefetch();
  }, []);

  const handledelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/kicksandfits/backend/fetching/deleteuser.php",
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div
      className="p-6 bg-stone-800 rounded text-white"
      style={{ width: "1000px"}}
    >
      <h1 className="text-2xl font-semibold mb-4 text-white">Registered Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse border border-gray-300">
          <thead>
            <tr className="bg-stone-900 font-medium">
              <th className="border border-stone-500 px-4 py-2">No.</th>
              <th className="border border-stone-500 px-4 py-2">ID.</th>
              <th className="border border-stone-500 px-4 py-2">Username</th>
              <th className="border border-stone-500 px-4 py-2">Email</th>
              <th className="border border-stone-500 px-4 py-2">
                Creation Date
              </th>
              <th className="border border-stone-500 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="bg-stone-700">
                <td className="border border-stone-500 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-stone-500 px-4 py-2">{user.id}</td>
                <td className="border border-stone-500 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-stone-500 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-stone-500 px-4 py-2">
                  {user.created_at}
                </td>
                <td className="border border-stone-500 px-4 py-2">
                  <button
                    onClick={() => handledelete(user.id)}
                    className="text-white hover:text-gray-100"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
