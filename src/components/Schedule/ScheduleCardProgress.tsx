import { useEffect, useState } from 'react';
import { Progress, Transition } from '@mantine/core';

const ScheduleCardProgress = ({ value }: { value: number }) => {
  const [mounted, setMounted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      setProgressValue(value);
    }, 100);
    return () => {
      setMounted(false);
      setProgressValue(0);
    };
  }, []);

  return (
    <Transition mounted={mounted} transition="scale-x" duration={700} timingFunction="ease">
      {(transitionStyle) => (
        <Progress
          value={progressValue}
          pos="absolute"
          h={7}
          bottom={0}
          left={0}
          right={0}
          color="red"
          style={{ ...transitionStyle, backgroundColor: 'inherit', zIndex: 1 }}
        />
      )}
    </Transition>
  );
};

export default ScheduleCardProgress;
