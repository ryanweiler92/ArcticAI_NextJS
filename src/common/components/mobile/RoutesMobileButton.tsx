'use client';

import {
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react';
import { FaRoute } from 'react-icons/fa';

interface Props {
  openRoutesMenu: () => void;
}

const RoutesMobileButton = ({ openRoutesMenu }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="tan.200">
        <FaRoute />
      </MenuButton>
      <MenuList bg="brand.800">
        <MenuItem bg="brand.800" onClick={openRoutesMenu}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Create Route</Text>
            <Spacer />
            <FaRoute color="tan" />
          </Flex>
        </MenuItem>
        <MenuDivider />
      </MenuList>
    </Menu>
  );
};

export default RoutesMobileButton;
