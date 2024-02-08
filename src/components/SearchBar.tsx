import { gql, useLazyQuery } from '@apollo/client';
import { Flex, IconButton, Input } from '@chakra-ui/react'
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
    console.log(data)
    return (
        <>
            <Flex>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users"
                />
                <IconButton onClick={handleSearch} aria-label='Search database' icon={<FiSearch />} />
            </Flex>

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error.message}</p>}

            {data && (
                <ul>
                    {data.search.nodes.map((user:any) => (
                        <li key={user.login}>
                            <img src={user.avatarUrl} alt="Avatar" />
                            <a href={`https://github.com/${user.login}`}>{user.login}</a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default SearchBar