import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { ElementHTML } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Settings } from '@/containers/Settings';
import { MediaAutocomplete } from '@/containers/MediaAutocomplete';
import { Space } from '@/components/layout';
import { Button, Input } from '@/components/forms';
import { Heading } from '@/components/typography';
import { Drawer, Portal, Modal } from '@/components/overlay';
import { classes } from '@/utils/helpers';
import styles from '@/containers/Header/Header.module.scss';

/* -------------------------------------------------------------------------- */
/** HeaderSearch (child component) **/
/* -------------------------------------------------------------------------- */

const HeaderSearch = () => {
  const { t } = useI18n();
  const { isMobile } = useBreakpoint();
  const [query, setQuery] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setTimeout(() => {
      searchRef.current?.focus();
    }, 100);
  };

  return (
    <Space align="center" gap={15} className={styles.headerActions}>
      <Portal>
        <Portal.Handler>
          {!isMobile ? (
            <Button outline className={classes(styles.headerAction, styles.search)}>
              <FiSearch />
              <span>Search</span>
            </Button>
          ) : (
            <Button outline tooltip={t('header.action.search')} className={styles.headerAction}>
              <FiSearch />
            </Button>
          )}
        </Portal.Handler>
        <Portal.Paper>
          <Modal className={styles.modalSearch} onOpen={handleOpen}>
            <Space direction="column">
              <Input
                ref={searchRef}
                name="search"
                className={styles.inputSearch}
                icon={FiSearch}
                placeholder={t('header.action.search.placeholder')}
                onChange={setQuery}
              />
              <MediaAutocomplete query={query} />
            </Space>
          </Modal>
        </Portal.Paper>
      </Portal>
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
              <Image src="/assets/images/logo-light.png" alt="logo" layout="fill" />
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
