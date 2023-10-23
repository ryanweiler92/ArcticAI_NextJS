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
import { useIsMobile } from '@hooks/hooks';

const SaveMapButton = ({ openSaveMapModal }: any) => {
  const isMobile = useIsMobile();

  const mobileMenuButton = (
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
        <MenuItem bg="brand.800">
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Load/Edit Maps</Text>
            <Spacer />
            <SiManageiq color="tan" />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  const desktopButton = (
    <Flex justify="center">
      <Button bg="tan.200" onClick={openSaveMapModal}>
        <Flex justify="between" alignItems="center">
          <GiSave />
          {!isMobile && <Text ml="2">Save Map</Text>}
        </Flex>
      </Button>
    </Flex>
  );

  return <> {isMobile ? mobileMenuButton : desktopButton} </>;
};

export default SaveMapButton;
