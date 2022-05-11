import React, { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "semantic-ui-react";
import EmployeeModal from "./EmployeeModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      setEmployees(response.data.data);
    } catch (error) {
      setMessage("The server is down");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Item.Group id="employee-list" data-cy="employee-list">
      {message && message}
      {employees.map((employee) => {
        return (
          <Item key={employee.id}>
            <Item.Image
              circular
              size="tiny"
              alt={employee.first_name}
              src={employee.avatar}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header>
                {employee.first_name} {employee.last_name}
              </Item.Header>
              <Item.Extra>
                <EmployeeModal id={employee.id} />
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      })}
    </Item.Group>
  );
};

export default EmployeeList;
