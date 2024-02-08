import { Flex, IconButton, Input } from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface Props { }

const SearchBar = () => {
    return (
        <>
            <Flex>
                <Input />
                <IconButton aria-label='Search database' icon={<FiSearch />} />
            </Flex>
        </>
    )
}

export default SearchBar