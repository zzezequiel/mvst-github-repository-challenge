// RepositoriesList.js
import { useEffect, useState } from 'react';
import { useLazyQuery, gql, useQuery } from '@apollo/client';
import { Box, List, ListItem, Link, Spinner } from '@chakra-ui/react';
import { useUser } from '@/Context/UserContext';



const RepositoriesList = () => {
  /**
   * @requires $username - username clicked, storage in context. 
   * @returns
   */
    const GET_USER_REPOS = gql`
      query getUserRepos($username: String!) {
        user(login: $username) {
          repositories(first: 10) {
            nodes {
              name
              description
              url
            }
          }
        }
      }
    `;

    /**
     *  I use "useQuery" just because the method first searh in cache if tje query was made before, so it prevent to make the query again.
     */
    const { selectedUser } = useUser();
  const { loading, error, data, refetch } = useQuery(GET_USER_REPOS, {
    variables: { username: selectedUser?.login },
    skip: !selectedUser // Evita realizar la consulta si no hay un usuario seleccionado
  });

  /**
   *  makes the query again if the context changes
   */
  useEffect(() => {
    refetch();
  }, [selectedUser, refetch]);

  if (!selectedUser) {
    return <p>Select a user</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const repositories = data.user.repositories.nodes;



    return (
        repositories?
        <Box>
            <List>
                {repositories.map((repo:any) => (
                    <ListItem key={repo.name}>
                        <Link href={repo.url}>{repo.name}</Link>: {repo.description}
                    </ListItem>
                ))}
            </List>
        </Box>
        :
        <></>
    );
};

export default RepositoriesList;
