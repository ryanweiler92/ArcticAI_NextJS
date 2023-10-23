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
import { FaLayerGroup } from 'react-icons/fa';

interface Props {
  openLayerModal: () => void;
  openManageLayersModal: () => void;
}

const LayersMobileButton = ({
  openLayerModal,
  openManageLayersModal,
}: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="tan.200">
        <FaLayerGroup />
      </MenuButton>
      <MenuList bg="brand.800">
        <MenuItem bg="brand.800" onClick={openLayerModal}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Add Layers</Text>
            <Spacer />
            <FaLayerGroup color="tan" />
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="brand.800" onClick={openManageLayersModal}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Manage Layers</Text>
            <Spacer />
            <FaLayerGroup color="tan" />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LayersMobileButton;
