import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { deleteChore, getChores } from "../../managers/choreManager";

export default function ChoresList({ loggedInUser }) {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    getChores().then(setChores);
  }, []);

  const handleDelete = (choreId) => {
    deleteChore(choreId).then(() => {
        getChores().then(setChores);
    })
  }

  return (
    <div className="container mt-4">
      <h2>Chores</h2>
        {loggedInUser?.roles?.includes("Admin") && (
            <Link to="/chores/create">
                <Button color="primary" className="mb-3">Create New Chore</Button>
            </Link>
        )}

      <Table striped className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Frequency</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {chores.map((c) => (
            <tr key={c.id}>
              <td>
                {c.name} 
              </td>
              <td>{c.difficulty}</td>
              <td>{c.choreFrequencyDays}</td>
              <td>
                {loggedInUser?.roles?.includes("Admin") && (
                    <Button
                        color="danger"
                        onClick={() => handleDelete(c.id)}
                    >
                        Delete
                    </Button>
                )}
              </td>
              <td>
                {loggedInUser.roles?.includes("Admin") && (
                    <Link to={`/chores/${c.id}`}>Details</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

