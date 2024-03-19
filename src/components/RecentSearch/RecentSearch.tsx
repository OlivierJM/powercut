import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, Button } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './RecentSearch.module.css';
import { IconX } from '@tabler/icons-react';

const RecentSearchTab = ({ place }: { place: string }) => {
    return (
        <Button
            rightSection={
                <IconX
                    size={14}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("clicked cancel");

                    }}
                />
            }
            onClick={(e) => {
                console.log("clicked on button");

            }}
        >
            {place}
        </Button>
    )
}

export default RecentSearchTab;