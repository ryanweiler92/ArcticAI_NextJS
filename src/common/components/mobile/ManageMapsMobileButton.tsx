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
import { GiSave } from 'react-icons/gi';
import { SiManageiq } from 'react-icons/si';

interface Props {
  openSaveMapModal: () => void;
  openManageMapsModal: () => void;
}

const ManageMapsMobileButton = ({
  openSaveMapModal,
  openManageMapsModal,
}: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="tan.200">
        <GiSave />
      </MenuButton>
      <MenuList bg="brand.800">
        <MenuItem bg="brand.800" onClick={openSaveMapModal}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Save Map</Text>
            <Spacer />
            <GiSave color="tan" />
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="brand.800" onClick={openManageMapsModal}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Load/Edit Maps</Text>
            <Spacer />
            <SiManageiq color="tan" />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ManageMapsMobileButton;
