import { Button } from '@mantine/core';
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