import { renderHook, act } from '@test-utils';
import { useFinder } from '../useFinder';
// TODO: Update this with more test cases
vi.mock('@/data/areas.json', async () => {
    const actual = await vi.importActual('@/data/areas.json');
    return {
      ...actual,
      Province1: {
        Group1: ['6 MILES', 'Area2'],
        Group2: ['Area3', 'Area4'],
      },
    };
  });

vi.mock('@/data/schedule.json', async () => {
    const actual = await vi.importActual('@/data/schedule.json');
    return {
      ...actual,
    };
  });

describe('useFinder', () => {
  it('should set area and find schedule when onOptionSelect is called', () => {
    const { result } = renderHook(() => useFinder());

    act(() => {
      result.current.onOptionSelect('6 MILES');
    });

    expect(result.current.area).toBe('6 MILES');
    expect(result.current.upcomingSchedules.length).toBeGreaterThan(2);
  });

  it('should remove area from recent searches when onTabBtnDelete is called', () => {
    const { result } = renderHook(() => useFinder());

    act(() => {
      result.current.setArea('Area1');
      result.current.handleRecentSearches();
      result.current.onTabBtnDelete('Area1');
    });

    expect(result.current.recentSearches).toBe('');
  });
});
