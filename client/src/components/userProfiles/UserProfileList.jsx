import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { getProfiles } from "../../managers/userProfileManager";

export default function UserProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then(setProfiles);
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Profiles</h2>
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id}>
              <td>
                {p.firstName} {p.lastName}
              </td>
              <td>{p.userName}</td>
              <td>{p.email}</td>
              <td>{p.roles?.join(", ") || "User"}</td>
              <td>
                <Link to={`/userprofiles/${p.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
