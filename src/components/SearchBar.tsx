import { useUser } from '@/Context/UserContext';
import { User } from '@/types';
import { gql, useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, Fade, Flex, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiArrowLeft, FiLoader, FiSearch } from 'react-icons/fi'

interface Props { }

const SearchBar = () => {

    /**
     * @returns 
     */
    const SEARCH_USERS = gql`
    query searchUsers($queryString: String!) {
      search(query: $queryString, type: USER, first: 10) {
        nodes {
          ... on User {
            login
            avatarUrl
            name
            bio
            location
            email
            company
            followers {
              totalCount
            }
            following {
              totalCount
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


    const { setSelectedUser, selectedUser } = useUser();

    /**
     * @param username User.login (username) clicled in menu item.
     * @param method  POST: Set the username clicked, DELETE: restart the context to null
     */
    const handleUserIncontext = (user: User, method: string) => {

        method === "POST" && setSelectedUser(user);
        method === "DELETE" && setSelectedUser(null);
    };
    return (
        <Box width={"lg"} ml={2}>
            <Menu>
                <Flex gap={2}>
                    {
                        loading ? <IconButton aria-label='Loading' icon={<FiLoader />} />
                            :
                            !selectedUser ?
                                <MenuButton onClick={handleSearch} as={Button} rightIcon={<FiSearch />} />
                                :
                                /**
                                 * Button to restart the context. 
                                 */
                                <IconButton aria-label='Back-home' icon={<FiArrowLeft />} onClick={() => handleUserIncontext(selectedUser, "DELETE")} />
                    }
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users"
                    />
                </Flex>


                {error && <p>Error: {error.message}</p>}

                {data && (


                    <MenuList w={"lg"}>

                        {data.search.nodes.map((user: any) => (
                            <MenuItem key={user.login} onClick={() => handleUserIncontext(user, "POST")} borderRadius="md" gap={5}>
                                <Avatar src={user.avatarUrl} />
                                <Text fontSize="lg">{user.login}</Text>
                            </MenuItem>
                        ))}

                    </MenuList>

                )}
            </Menu>

        </Box>
    )
}

export default SearchBar