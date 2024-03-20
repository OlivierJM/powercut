import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, Button } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './RecentSearch.module.css';
import { IconX } from '@tabler/icons-react';

const RecentSearchTab = ({ onTabSelect, onTabDelete, place }: { onTabSelect: Function, onTabDelete: Function, place: string }) => {
    return (
        <Button
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
            {place}
        </Button>
    )
}

export default RecentSearchTab;