import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createChore } from "../../managers/choreManager";

export default function CreateChore() {
  const [name, setName] = useState("");
  const [difficulty , setDifficulty] = useState(1);
  const [choreFrequencyDays , setFrequency] = useState(1);
  const [errors, setErrors] = useState({})

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChore = {
      name,
      difficulty,
      choreFrequencyDays
    };

    createChore(newChore).then((res) => {
        if (res.errors) {
            setErrors(res.errors);
        } else {
            navigate("/chores");
        }
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
            min={1}
            max={5}
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
            min={1}
            max={14}
            value={choreFrequencyDays}
            onChange={(e) => {
              setFrequency(parseInt(e.target.value));
            }}
          />
        </FormGroup>
         <div style={{ color: "red" }}>
            {Object.keys(errors).map((key) => (
                <p key={key}>
                {key}: {errors[key].join(",")}
                </p>
            ))}
        </div>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}