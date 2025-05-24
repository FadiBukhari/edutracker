import React, { useState, useMemo } from "react";
import { useStore } from "../useStore";
import "./CSS/Admin.css";
const AdminPage = () => {
  const users = useStore((state) => state.users);
  const deleteUser = useStore((state) => state.deleteUser);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.role === "parent" || user.role === "user")
      .filter((user) => {
        if (roleFilter !== "all" && user.role !== roleFilter) return false;

        const searchLower = search.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      });
  }, [users, search, roleFilter]);

  return (
    <div className="admin-page">
      <h1>Admin - Manage Users</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, padding: "0.5rem" }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: "0.5rem", minWidth: 120 }}
        >
          <option value="all">All Roles</option>
          <option value="parent">Parent</option>
          <option value="user">User</option>
        </select>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.email)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
