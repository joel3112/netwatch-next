import { ElementHTML, MediaData, MediaImageRatio } from '@/types';
import Link from 'next/link';
import { RiPlayFill } from 'react-icons/ri';
import { useI18n } from '@/hooks/useI18n';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useModal } from '@/hooks/useModal';
import { useVideo } from '@/hooks/useVideo';
import { useFavourite } from '@/hooks/useFavourite';
import { Space } from '@/components/layout';
import { Text } from '@/components/typography';
import { Card } from '@/components/display';
import { Button } from '@/components/forms';
import { Modal, Portal } from '@/components/overlay';
import { Video } from '@/components/media';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaCondensed/MediaCondensed.module.scss';

/* -------------------------------------------------------------------------- */
/** MediaCondensedInfo (main component) **/
/* -------------------------------------------------------------------------- */

type MediaCondensedInfoProps = MediaData;

const MediaCondensedInfo = (props: MediaCondensedInfoProps) => {
  const { id, type, name, description } = props;
  const { t } = useI18n('home');
  const { isOpened, handleChange } = useModal();
  const { videoId } = useVideo(isOpened ? id : 0, type);
  const { favouriteAction, FavouriteIcon, onToggle } = useFavourite();

  return (
    <>
      <div className={styles.info} data-swiper-parallax="-300">
        <Text className={styles.title}>{name}</Text>

        <Text size="sm" maxLines={4} className={styles.description}>
          {description}
        </Text>

        <Space align="center" gap={8}>
          <Card.Actions className={styles.actionsInfo}>
            <Card.Actions.Item
              icon={FavouriteIcon(id)}
              tooltip={favouriteAction(id)}
              onClick={(e: UIEvent) => onToggle(e, props)}
            />
            <Card.Actions.Item
              tooltip={t('item.action.trailer')}
              icon={RiPlayFill}
              onClick={() => handleChange(true)}
            />
          </Card.Actions>

          <Link href={{ pathname: '/[type]/[id]', query: { type, id } }}>
            <a>
              <Button rounded className={styles.buttonInfo}>
                {t('item.action.more')}
              </Button>
            </a>
          </Link>
        </Space>
      </div>

      <Portal>
        <Portal.Paper>
          <Modal opened={isOpened} onChange={handleChange}>
            <Video id={videoId} autoplay />
          </Modal>
        </Portal.Paper>
      </Portal>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/** Container (main component) **/
/* -------------------------------------------------------------------------- */

export type MediaCondensedProps = typeof defaultProps & ElementHTML & MediaData;

const defaultProps = {};

const MediaCondensed = (props: MediaCondensedProps) => {
  const { key, isMobile } = useBreakpoint();

  return (
    <div className={classes(styles.wrapper, styles[key])}>
      <Card className={classes(styles.card, styles.condensed)} skeleton={!props.type}>
        <Card.Image
          classes={styles.image}
          src={props.backdrop}
          width="100%"
          ratio={isMobile ? MediaImageRatio.BACKDROP : MediaImageRatio.BACKDROP * 0.6}
          lazy
        />
      </Card>

      <MediaCondensedInfo {...props} />
    </div>
  );
};

MediaCondensed.defaultProps = defaultProps;

export default MediaCondensed;
