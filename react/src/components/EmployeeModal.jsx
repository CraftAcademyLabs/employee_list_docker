import React, { useState } from "react";
import axios from "axios";
import { Modal, Image, Header, Button } from "semantic-ui-react";

const EmployeeModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({});

  const getEmployee = async () => {
    let response = await axios.get(`https://reqres.in/api/users/${id}`);
    setEmployee(response.data.data);
    setOpen(true);
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={getEmployee}
      open={open}
      trigger={
        <Button 
        size="tiny" 
        positive 
        data-cy={`user-${id}`}>
          View
        </Button>
      }
    >
      <Modal.Content image>
        <Image size="small" src={employee.avatar} wrapped />
        <Modal.Description>
          <Header>
            {employee.first_name} {employee.last_name}
          </Header>
          <p>Email: {employee.email}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black">Edit</Button>
        <Button negative>Delete</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EmployeeModal;
