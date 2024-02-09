import { useUser } from '@/Context/UserContext';
import { gql, useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, Fade, Flex, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiArrowLeft, FiLoader, FiSearch } from 'react-icons/fi'

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


    const { setSelectedUsername, selectedUsername } = useUser();

    const handleUserIncontext = (username: string, method: string) => {

       method==="POST"&& setSelectedUsername(username);
       method==="DELETE"&& setSelectedUsername(null);
    };
    return (
        <Box width={"lg"} ml={2}>
            <Menu>
            <Flex gap={2}>
                {
                 loading?<IconButton aria-label='Loading' icon={<FiLoader />} /> 
                 : 
                 !selectedUsername ?
                 <MenuButton onClick={handleSearch} as={Button} rightIcon={<FiSearch />} />  
                :
                <IconButton aria-label='Back-home' icon={<FiArrowLeft />}  onClick={()=> handleUserIncontext(selectedUsername, "DELETE")}/>
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
                                <MenuItem key={user.login} onClick={() => handleUserIncontext(user.login, "POST")} borderRadius="md" gap={5}>
                                        <Avatar src={user.avatarUrl}/>
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