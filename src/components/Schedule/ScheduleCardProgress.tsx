import { useEffect, useState } from 'react';
import { Progress, Transition } from '@mantine/core';

const ScheduleCardProgess = ({ value }: { value: number }) => {
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setProgressValue(value);
    }, 100);
    return () => {
      setProgressValue(0);
    };
  }, []);

  return (
    <Transition
      mounted={progressValue !== 0}
      transition="scale-x"
      duration={700}
      timingFunction="ease"
    >
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

export default ScheduleCardProgess;
