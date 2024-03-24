import { Button } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import classes from './RecentSearch.module.css';

const RecentSearchTab = ({
  onTabSelect,
  onTabDelete,
  place,
}: {
  onTabSelect: Function;
  onTabDelete: Function;
  place: string;
}) => (
  <Button
    radius="xl"
    size="compact-md"
    className={classes.btn}
    color="gray"
    rightSection={
      <IconX
        size={14}
        onClick={(e) => {
          e.stopPropagation();
          onTabDelete(place);
        }}
      />
    }
    onClick={() => {
      onTabSelect(place);
    }}
  >
    <span className={classes.btnText}>{place}</span>
  </Button>
);

export default RecentSearchTab;
