import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Input, ListGroup, ListGroupItem } from "reactstrap";
import { assignChore, getChore, unassignChore } from "../../managers/choreManager";
import { getProfiles } from "../../managers/userProfileManager";


export default function ChoreDetails() {
  const { id } = useParams();
  const [chore, setChore] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getChore(id).then(setChore);
    getProfiles().then(setUsers);
  }, [id]);

  if (!chore) return null;

  const mostRecentCompletion = chore?.choreCompletions?.length > 0
    ? chore.choreCompletions.reduce((latest, c) =>
        new Date(c.completedOn) > new Date(latest.completedOn) ? c : latest
        )
    : null;

    const handleAssignmentChange = (e) => {
        const userId = parseInt(e.target.value);
        if (e.target.checked)
        {
            assignChore(id, userId).then(() => getChore(id).then(setChore));
        }
        else{
            unassignChore(id, userId).then(() => getChore(id).then(setChore));
        }
    }

  return (
    <div className="container mt-4">
      <h2>
        {chore.name}
      </h2>

      <Card className="mb-4">
        <CardHeader>Chore Details</CardHeader>
        <ListGroup flush>
          <ListGroupItem>
            <strong>Difficulty:</strong> {chore.difficulty}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Frequency:</strong> {chore.choreFrequencyDays}
          </ListGroupItem>
        </ListGroup>
      </Card>

      <Card className="mb-4">
        <CardHeader>Current Assignees</CardHeader>
        <CardBody>
            <ListGroup flush>
                {users.map((u) => (
                <ListGroupItem key={u.id}>
                    <Input
                    type="checkbox"
                    value={u.id}
                    checked={chore.choreAssignments?.some(a => a.userProfileId === u.id)}
                    onChange={handleAssignmentChange}
                    />
                    {" "}{u.firstName} {u.lastName}
                </ListGroupItem>
                ))}
            </ListGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Most Recent Completion</CardHeader>
        <CardBody>
          {chore.choreCompletions?.length > 0 ? (
            <ListGroup flush>
            {mostRecentCompletion && (
                <p>{new Date(mostRecentCompletion.completedOn).toLocaleDateString()}</p>
            )}
            </ListGroup>
          ) : (
            <p className="text-muted mb-0">No completions yet.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}