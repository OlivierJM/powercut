import { AppShell, Burger, Group, UnstyledButton, ActionIcon } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router';
import classes from './AppWrapper.module.css';

interface Props {
  onToggle: () => void;
  opened: boolean;
}
export const Header = ({ onToggle, opened }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      label: 'Home',
      route: '/',
      visible: location.pathname !== '/',
    },
    {
      label: 'FAQ',
      route: '/faq',
    },
    // {
    //   label: 'Help',
    //   route: '/help',
    // },
  ];

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={onToggle}
            data-testid="home-button"
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            <ActionIcon
              variant="transparent"
              size="sm"
              aria-label="clear-area"
              onClick={() => {
                navigate('/');
              }}
            >
              <IconBolt size={30} />
            </ActionIcon>
            <Group ml="xl" gap={0} visibleFrom="sm">
              {routes.map((route, index) => {
                if (route.visible === false) return null;
                return (
                  <UnstyledButton
                    key={index}
                    onClick={() => navigate(route.route)}
                    className={classes.control}
                  >
                    {route.label}
                  </UnstyledButton>
                );
              })}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {routes.map((route, index) => (
          <UnstyledButton
            key={index}
            onClick={() => navigate(route.route)}
            className={classes.control}
          >
            {route.label}
          </UnstyledButton>
        ))}
      </AppShell.Navbar>
    </>
  );
};
