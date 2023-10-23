'use client';

import {
  Box,
  IconButton,
  Flex,
  Text,
  Divider,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
  useEditableControls,
} from '@chakra-ui/react';
import { MdRemoveCircle } from 'react-icons/md';
import { VscSymbolColor } from 'react-icons/vsc';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  updateRouteNameAction,
  openColorMenuAction,
  setRouteToUpdateAction,
  updateRouteAnimationAction,
  setRoutesToRemoveAction,
} from '@redux/slices/routesSlice';
import { Route } from '@redux/types';

interface UpdatedRoute {
  id: string;
  routeName: string;
}

const RoutesSideDisplay = () => {
  const routes = useAppSelector((state) => state.routes.routes);

  const dispatch = useAppDispatch();
  const updateRouteName = (updatedRoute: UpdatedRoute) => {
    dispatch(updateRouteNameAction(updatedRoute));
  };
  const openColorMenu = (open: boolean) => {
    dispatch(openColorMenuAction(open));
  };
  const setRouteToUpdate = (route: Route) => {
    dispatch(setRouteToUpdateAction(route));
  };
  const updateAnimationStatus = (id: string, isAnimating: boolean) => {
    const updatedRoute = { id, isAnimating };
    dispatch(updateRouteAnimationAction(updatedRoute));
  };
  const setRoutesToRemove = (routes: Array<string>) => {
    dispatch(setRoutesToRemoveAction(routes));
  };

  const updateRouteNameOnSubmit = (id: string, routeName: string) => {
    const updatedRoute = { id, routeName };
    updateRouteName(updatedRoute);
  };

  const handleColorMenuClick = (route: Route) => {
    setRouteToUpdate(route);
    openColorMenu(true);
  };

  const handleRemoveRoute = (id: string) => {
    setRoutesToRemove([id]);
  };

  const handleAnimationPlay = (route: Route, command: string) => {
    const { id } = route;
    const animationStatus = command === 'play' ? true : false;
    const updatedRoute = {
      ...route,
      isAnimating: animationStatus,
    };
    setRouteToUpdate(updatedRoute);
    updateAnimationStatus(id, animationStatus);
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <>
        <IconButton
          icon={<CheckIcon />}
          aria-label="submit marker name"
          bg="tan.200"
          size="sm"
          color="brand.800"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label="cancel"
          bg="tan.200"
          size="sm"
          color="brand.800"
          {...getCancelButtonProps()}
        />
      </>
    ) : (
      <IconButton
        icon={<EditIcon />}
        aria-label="edit marker name"
        bg="tan.200"
        size="sm"
        color="brand.800"
        {...getEditButtonProps()}
      />
    );
  };

  return (
    <Box width="100%" mt="4">
      <Flex justify="center" width="100%">
        <Text color="tan.200" fontSize="xl" fontWeight="600">
          Active Routes
        </Text>
      </Flex>
      <Flex justify="center">
        <Divider width="80%" />
      </Flex>
      {routes?.map((route: Route) => {
        return (
          <Flex
            mt="2"
            flexDirection="column"
            alignItems="center"
            border="2px"
            borderColor="tan.200"
            borderRadius="10"
            key={route.id}
          >
            <Editable
              textAlign="center"
              color="tan.200"
              fontSize="sm"
              fontWeight="600"
              defaultValue={route.routeName}
              isPreviewFocusable={false}
              onSubmit={(title) => updateRouteNameOnSubmit(route.id, title)}
            >
              <Box width="100%" px=".5">
                <EditablePreview />
                <Input as={EditableInput} fontSize="xs" width="100%" />
              </Box>
              <Flex gap="4" mt="1" justifyContent={'center'} pb="1">
                <IconButton
                  icon={<MdRemoveCircle />}
                  aria-label="remove route"
                  bg="tan.200"
                  size="sm"
                  color="brand.800"
                  onClick={() => handleRemoveRoute(route.id)}
                />
                <IconButton
                  icon={<VscSymbolColor />}
                  aria-label="change route color"
                  bg="tan.200"
                  size="sm"
                  color="brand.800"
                  onClick={() => handleColorMenuClick(route)}
                />
                <EditableControls />
                {route.isAnimating ? (
                  <IconButton
                    icon={<FaStop />}
                    aria-label="stop animation"
                    bg="tan.200"
                    size="sm"
                    color="brand.800"
                    onClick={() => handleAnimationPlay(route, 'stop')}
                  />
                ) : (
                  <IconButton
                    icon={<FaPlay />}
                    aria-label="play animation"
                    bg="tan.200"
                    size="sm"
                    color="brand.800"
                    onClick={() => handleAnimationPlay(route, 'play')}
                  />
                )}
              </Flex>
            </Editable>
          </Flex>
        );
      })}
    </Box>
  );
};

export default RoutesSideDisplay;
