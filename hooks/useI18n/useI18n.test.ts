import { renderHook } from '@testing-library/react';
import { useI18n } from '@/hooks/useI18n';

describe('Tests useI18n hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useI18n());

    expect(result.current).toHaveProperty('t');
    expect(result.current).toHaveProperty('i18n');
    expect(result.current).toHaveProperty('ready');
    expect(result.current).toHaveProperty('locale');
    expect(result.current).toHaveProperty('language');
    expect(result.current).toHaveProperty('region');
  });
});
