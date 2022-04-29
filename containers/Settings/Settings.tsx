import { IconType } from 'react-icons';
import { MdOutlineDarkMode, MdOutlineLightMode, MdSettingsBrightness } from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { Space } from '@/components/layout';
import { ToggleButton } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/containers/Settings/Settings.module.scss';

/* -------------------------------------------------------------------------- */
/** SettingsMode (child component) **/
/* -------------------------------------------------------------------------- */

type SettingMode = {
  key: string;
  label: string;
  Icon: IconType;
};

type SettingsModeProps = {
  modes?: Array<SettingMode>;
};

export const defaultModes: Array<SettingMode> = [
  {
    key: 'light',
    label: 'settings.aspect.option.light',
    Icon: MdOutlineLightMode
  },
  {
    key: 'auto',
    label: 'settings.aspect.option.auto',
    Icon: MdSettingsBrightness
  },
  {
    key: 'dark',
    label: 'settings.aspect.option.dark',
    Icon: MdOutlineDarkMode
  }
];

const SettingsMode = ({ modes = defaultModes }: SettingsModeProps) => {
  const { themeKey, onChangeTheme } = useTheme();

  return (
    <ToggleButton className={styles.settingsMode} activeButton={themeKey} onChange={onChangeTheme}>
      {modes.map(({ key, label, Icon }) => (
        <ToggleButton.Item key={key} value={key} className={styles.settingsModeItem}>
          <Space align="center" gap={8}>
            <div className={classes(styles.modeIcon, styles[key])}>
              <Icon />
            </div>
            <span className={styles.modeLabel}>{label}</span>
          </Space>
        </ToggleButton.Item>
      ))}
    </ToggleButton>
  );
};

/* -------------------------------------------------------------------------- */
/** Container (main component) **/
/* -------------------------------------------------------------------------- */

type SettingSectionContent = ({ modes }: SettingsModeProps) => JSX.Element;

export type SettingSection = {
  key: string;
  heading: string;
  content: SettingSectionContent;
};

type SettingsProps = typeof defaultProps & {
  sections?: Array<SettingSection>;
};

export const defaultProps = {
  sections: [
    {
      key: 'mode',
      heading: 'settings.aspect.heading',
      content: SettingsMode
    }
  ]
};

const Settings = ({ sections }: SettingsProps) => {
  return (
    <Space direction="column" gap={20} className={classes(styles.wrapper)}>
      {sections.map(({ heading, content: Content }) => {
        return (
          <Space key={heading} direction="column" gap={10} className={styles.section}>
            {heading && <span className={styles.heading}>{heading}</span>}

            <div className={styles.content}>
              <Content />
            </div>
          </Space>
        );
      })}
    </Space>
  );
};

Settings.defaultProps = defaultProps;

export default Settings;
