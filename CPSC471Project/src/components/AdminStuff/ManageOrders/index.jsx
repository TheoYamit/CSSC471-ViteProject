import React, { useState, useEffect } from 'react';
import { Flex, Box, VStack, Button, useBreakpointValue } from '@chakra-ui/react';

const ManageOrders = () => {

  const [users, setUsers] = useState([]);
  const direction = useBreakpointValue({ base: "column", large: "row" });

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:3001/getusers', {
        method: "GET",
      });
      const responseFromServer = await response.json();
      const { listofusers } = responseFromServer;
      setUsers(listofusers);
    }
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users])

  return (
    <>
      <Flex direction={direction}>
        <Box >
          <VStack>
            <Flex>
              {users.map(({ Username }) => {
                return (
                  <Button>{Username}</Button>
                );
              })};

            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default ManageOrders;