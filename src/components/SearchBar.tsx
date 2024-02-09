import { useUser } from '@/Context/UserContext';
import { gql, useLazyQuery } from '@apollo/client';
import { Avatar, Box, Fade, Flex, IconButton, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

interface Props { }

const SearchBar = () => {
    const SEARCH_USERS = gql`
  query searchUsers($queryString: String!) {
    search(query: $queryString, type: USER, first: 10) {
      nodes {
        ... on User {
          login
          name
          avatarUrl
          repositories(first: 10) {
            nodes {
              name
              description
              url
            }
          }
        }
      }
    }
  }
`;


    const [searchTerm, setSearchTerm] = useState('');
    const [searchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS);

    const handleSearch = () => {
        searchUsers({ variables: { queryString: searchTerm } });
    };


    const { setSelectedUsername } = useUser();

    const saveUserIncontext = (username: string) => {
        setSelectedUsername(username);
    };
    return (
        <Box width={"2xl"} >
            <Flex gap={2}>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users"
                />
                <IconButton onClick={handleSearch} aria-label='Search database' icon={<FiSearch />} />
            </Flex>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {data && (

                <TableContainer position={"absolute"} width={"2xl"} borderRadius="md">
                    <Table variant='striped' colorScheme='blue' >
                        <TableCaption>Results</TableCaption>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody borderRadius="md">
                            {data.search.nodes.map((user: any) => (
                                <Tr key={user.login} onClick={() => saveUserIncontext(user.login)} borderRadius="md">
                                    <Td borderRadius="md">
                                        <Avatar src={user.avatarUrl}/>
                                    </Td>
                                    <Td borderRadius="md">
                                        <Link href={`https://github.com/${user.login}`}>{user.login}</Link>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

            )}
        </Box>
    )
}

export default SearchBar