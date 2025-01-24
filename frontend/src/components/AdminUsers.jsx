import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

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

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Admin Users</h1>
      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-lg"
            >
              <div className="flex items-center space-x-6">
                <p className="font-bold text-gray-600">{index + 1}.</p>
                <div>
                  <p className="font-medium text-gray-800">{user.username}</p>
                  <p className="text-sm text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    Created: {user.created_at}
                  </p>
                </div>
              </div>
              <button
                // onClick={() => handleDelete(user.id)}  // Uncomment when handleDelete is implemented
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
