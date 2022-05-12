import Link from 'next/link';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { FiSettings } from 'react-icons/fi';
import { ElementHTML } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { Settings } from '@/containers/Settings';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { Heading } from '@/components/typography';
import { Drawer, Portal } from '@/components/overlay';
import { classes } from '@/utils/helpers';
import styles from '@/containers/Header/Header.module.scss';

/* -------------------------------------------------------------------------- */
/** HeaderActions (child component) **/
/* -------------------------------------------------------------------------- */

type HeaderActionsProps = {
  actions?: Array<{ label: string; Icon: IconType }>;
};

const defaultActions = [{ label: 'header.action.settings', Icon: FiSettings }];

const HeaderActions = ({ actions = defaultActions }: HeaderActionsProps) => {
  const { t } = useI18n();

  return (
    <Space align="center" gap={20} className={styles.headerActions}>
      {actions.map(({ label, Icon }) => (
        <Portal key={label}>
          <Portal.Handler>
            <Button outline tooltip={t(label)} className={styles.headerAction}>
              <Icon />
            </Button>
          </Portal.Handler>
          <Portal.Paper>
            <Drawer position="right" heading={t(label)}>
              <Settings />
            </Drawer>
          </Portal.Paper>
        </Portal>
      ))}
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** Container (main component) **/
/* -------------------------------------------------------------------------- */

export type HeaderProps = typeof defaultProps & ElementHTML;

const defaultProps = {};

const Header = ({}: HeaderProps) => {
  const { t } = useI18n();

  return (
    <Space justify="between" align="center" className={classes(styles.wrapper)}>
      <Link href="/">
        <a>
          <Space align="center">
            <div className={styles.logo}>
              <Image src="/assets/images/logo-light.png" alt="logo" layout="fill" />
            </div>

            <Heading level={1} className={styles.title}>
              {t('application.name')}
            </Heading>
          </Space>
        </a>
      </Link>

      <Space align="center" gap={10}>
        <HeaderActions />
      </Space>
    </Space>
  );
};

Header.defaultProps = defaultProps;

export default Header;
