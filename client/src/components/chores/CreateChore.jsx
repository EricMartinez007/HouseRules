import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createChore } from "../../managers/choreManager";

export default function CreateChore() {
  const [name, setName] = useState("");
  const [difficulty , setDifficulty] = useState(0);
  const [choreFrequencyDays , setFrequency] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChore = {
      name,
      difficulty,
      choreFrequencyDays
    };

    createChore(newChore).then(() => {
      navigate("/chores");
    });
  };

  return (
    <>
      <h2>Create A Chore</h2>
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Difficulty</Label>
          <Input
            type="number"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Frequency</Label>
          <Input
            type="number"
            value={choreFrequencyDays}
            onChange={(e) => {
              setFrequency(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}