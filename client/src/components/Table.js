import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
  TableCaption,
  Tfoot,
} from '@chakra-ui/react';
import ActionButton from './actionButton';

const CustomTable = ({ url }) => {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchCows = async () => {
    try {
      const response = await axios.get(url); 
      const fetchedCows = response.data.cows || response.data.milks || response.data.births ||response.data.medExam || []; 
      setCows(fetchedCows);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cows:', error);
      setLoading(false);
    }
  };

  fetchCows();
}, [url]);

const deleteCow = async (cowId) => {
    try {
      await axios.post(url + `/delete/${cowId}`);
      // After successful deletion, you might want to refetch the cow data or update the state
    } catch (error) {
      console.error('Error deleting cow:', error);
    }
  };


  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Cows List</TableCaption>
        <Thead>
          <Tr>
            <Th>Cow ID</Th>
            <Th>Date Arrived</Th>
            <Th>Race</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan="4">Loading...</Td>
            </Tr>
          ) : (
            cows.map((cow) => (
              <Tr key={cow.cow_id}>
                <Td>{cow.cow_id || cow.id || cow.new_born_cow_id || cow.test_id}</Td>
                <Td>{cow.date_arrived || cow.day || cow.mother_cow_id ||cow. testDate}</Td>
                <Td>{cow.race ||  cow.milk_litres || cow.date_of_birth || cow.disease}</Td>
                <Td>
                <ActionButton url={url} cowId={cow.cow_id || cow.id || cow.new_born_cow_id|| cow.test_id} />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
