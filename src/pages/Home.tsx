import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { Welcome } from '../components/Welcome/Welcome';
import Finder from '@/components/Schedule/Finder';

export function HomePage() {
  return (
    <AppWrapper>
      <Welcome />
      <Finder />
    </AppWrapper>
  );
}
