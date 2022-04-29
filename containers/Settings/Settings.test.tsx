import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings, {
  defaultModes,
  defaultProps,
  SettingSection
} from '@/containers/Settings/Settings';

const mockOnChangeThemeValue = jest.fn();

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn().mockImplementation(() => ({
    theme: 'light',
    darkMode: false,
    onChangeTheme: mockOnChangeThemeValue
  }))
}));

describe('Tests Settings component', () => {
  test('renders container correctly', () => {
    const { container } = render(<Settings />);

    expect(container).toMatchSnapshot();
  });

  describe('Tests SettingsMode ', () => {
    const mode = defaultProps.sections.find(({ key }) => key === 'mode') as SettingSection;
    const defaultModeLabels = defaultModes.map(({ label }) => label).join('|');

    test('renders mode settings correctly', () => {
      render(<Settings />);

      expect(screen.getByText(mode.heading)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(`${defaultModeLabels}`, 'i'))).toHaveLength(3);
    });

    defaultModes.forEach(({ key, label }) => {
      test(`changes the ${key} mode from settings correctly`, async () => {
        render(<Settings />);

        userEvent.click(screen.getByText(label));

        await waitFor(() => {
          expect(mockOnChangeThemeValue).toHaveBeenCalledWith(key);
        });
      });
    });
  });
});
