import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { getChore } from "../../managers/choreManager";


export default function ChoreDetails() {
  const { id } = useParams();
  const [chore, setChore] = useState(null);

  useEffect(() => {
    getChore(id).then(setChore);
  }, [id]);

  if (!chore) return null;

  const mostRecentCompletion = chore?.choreCompletions?.length > 0
    ? chore.choreCompletions.reduce((latest, c) =>
        new Date(c.completedOn) > new Date(latest.completedOn) ? c : latest
        )
    : null;


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
          {chore.choreAssignments?.length > 0 ? (
            <ListGroup flush>
                {chore.choreAssignments.map((a) => (
                    <ListGroupItem key={a.id}>{a.userProfile.firstName} {a.userProfile.lastName}</ListGroupItem>
                ))}
            </ListGroup>
          ) : (
            <p className="text-muted mb-0">No assignees.</p>
          )}
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