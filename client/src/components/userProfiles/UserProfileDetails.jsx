import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { getProfile } from "../../managers/userProfileManager";

export default function UserProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile(id).then(setProfile);
  }, [id]);

  if (!profile) return null;

  return (
    <div className="container mt-4">
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>

      <Card className="mb-4">
        <CardHeader>Profile Info</CardHeader>
        <ListGroup flush>
          <ListGroupItem>
            <strong>Username:</strong> {profile.userName}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Email:</strong> {profile.email}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Address:</strong> {profile.address}
          </ListGroupItem>
        </ListGroup>
      </Card>

      <Card className="mb-4">
        <CardHeader>Assigned Chores</CardHeader>
        <CardBody>
          {profile.choreAssignments?.length > 0 ? (
            <ListGroup flush>
              {profile.choreAssignments.map((a) => (
                <ListGroupItem key={a.id}>{a.chore?.name}</ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted mb-0">No assigned chores.</p>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Completed Chores</CardHeader>
        <CardBody>
          {profile.choreCompletions?.length > 0 ? (
            <ListGroup flush>
              {profile.choreCompletions.map((c) => (
                <ListGroupItem key={c.id}>
                  {c.chore?.name} —{" "}
                  {new Date(c.completedOn).toLocaleDateString()}
                </ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted mb-0">No completed chores.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
