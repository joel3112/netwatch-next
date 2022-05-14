import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useVideo } from '@/hooks/useVideo';

jest.mock('axios');

describe('Tests useVideo hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useVideo(634649, 'movie', 'videoId'));

    expect(result.current.videoId).toBe('videoId');
  });

  test('works hook correctly with fetch', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 634649,
        results: [{ id: 1, key: '6Cl8PmVm3YE', type: 'Trailer' }]
      }
    });

    const { result } = renderHook(() => useVideo(634649, 'movie'));

    await waitFor(() => {
      expect(result.current.videoId).toBe('6Cl8PmVm3YE');
    });
  });
});
