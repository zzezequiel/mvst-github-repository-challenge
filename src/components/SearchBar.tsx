import { useUser } from '@/Context/UserContext';
import { User } from '@/types';
import { gql, useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, Fade, Flex, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
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

    if (method === "POST") {
      setSelectedUser(null);
      setSelectedUser(user);
    }
    method === "DELETE" && setSelectedUser(null);
  };
  return (
    <Box width={"lg"} ml={2}>
      <form>
        <Menu>
          <Flex gap={2}>
            {
              /**
               * Button to restart the context. 
              */
              selectedUser &&
              <IconButton backgroundColor={useColorModeValue('gray.100', 'gray.900')} border={useColorModeValue("0px", "1px")} borderColor={useColorModeValue('gray.300', 'gray.700')} aria-label='Back-home' icon={<FiArrowLeft />} onClick={() => handleUserIncontext(selectedUser, "DELETE")} />
            }
            {
              loading ? <IconButton backgroundColor={useColorModeValue('gray.100', 'gray.900')} border={useColorModeValue("0px", "1px")} borderColor={useColorModeValue('gray.300', 'gray.700')} aria-label='Loading' icon={<FiLoader />} />
                :
                <MenuButton role={"button"} type='submit' backgroundColor={useColorModeValue('gray.100', 'gray.900')} border={useColorModeValue("0px", "1px")} borderColor={useColorModeValue('gray.300', 'gray.700')} onClick={handleSearch} as={Button}><FiSearch /></MenuButton>
            }

            <Input
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users"
            />
          </Flex>


          {error && <p>Error: {error.message}</p>}

          {data && (


            <MenuList>

              {data.search.nodes.map((user: any) => (
                <MenuItem key={user.login} onClick={() => handleUserIncontext(user, "POST")} borderRadius="md" gap={5} >
                  <Avatar src={user.avatarUrl} />
                  <Text fontSize="lg">{user.login}</Text>
                </MenuItem>
              ))}

            </MenuList>

          )}
        </Menu>
      </form>
    </Box>
  )
}

export default SearchBar