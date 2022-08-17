import { useState } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { ElementHTML } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Settings } from '@/containers/Settings';
import { MediaAutocomplete } from '@/containers/MediaAutocomplete';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { Heading } from '@/components/typography';
import { Image } from '@/components/media';
import { Drawer, Portal, Modal } from '@/components/overlay';
import { classes } from '@/utils/helpers';
import styles from '@/containers/Header/Header.module.scss';

/* -------------------------------------------------------------------------- */
/** HeaderSearch (child component) **/
/* -------------------------------------------------------------------------- */

const HeaderSearch = () => {
  const { t } = useI18n();
  const { isMobile } = useBreakpoint();
  const [opened, setOpened] = useState(false);

  const buttonProps = (text: boolean) => ({
    onClick: () => setOpened(true),
    outline: true,
    className: classes(styles.headerAction, text && styles.search)
  });

  const handleChange = () => setOpened((prev) => !prev);

  return (
    <Space align="center" gap={15} className={styles.headerActions}>
      {!isMobile ? (
        <Button {...buttonProps(true)}>
          <FiSearch />
          <span>{t('header.action.search')}</span>
        </Button>
      ) : (
        <Button tooltip={t('header.action.search')} {...buttonProps(false)}>
          <FiSearch />
        </Button>
      )}
      <Portal.Paper>
        <Modal opened={opened} onChange={handleChange} className={styles.modalSearch}>
          <MediaAutocomplete onClose={() => setOpened(false)} />
        </Modal>
      </Portal.Paper>
    </Space>
  );
};

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
              <Image src="/assets/images/logo-light.png" alt="logo" />
            </div>

            <Heading level={1} className={styles.title}>
              {t('application.name')}
            </Heading>
          </Space>
        </a>
      </Link>

      <Space align="center" gap={10}>
        <HeaderSearch />
        <HeaderActions />
      </Space>
    </Space>
  );
};

Header.defaultProps = defaultProps;

export default Header;
