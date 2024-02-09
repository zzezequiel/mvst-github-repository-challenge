import { Box, BoxProps, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react"
import UserInfo from "./UserInfo";

interface SidebarProps extends BoxProps {
    onClose: () => void
  }
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
       
        w={{ base: 'full', md: 500 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          {/* USER PHOTO AND NAME */}
          <UserInfo />
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
  
      </Box>
    )
  }

  export default SidebarContent;