import { Flex, FlexProps, IconButton, Input, useColorModeValue } from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";


interface HeadMenuProps extends FlexProps {
    onOpen: () => void
  }
const HeadMenu = ({ onOpen, ...rest }: HeadMenuProps) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="40"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderTopWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'center' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <SearchBar />
      </Flex>
    )
  }

  export default HeadMenu;