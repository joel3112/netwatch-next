/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createContext, useContext, MouseEvent, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { ElementChildren, ElementHTML, ElementLink, ElementSkeleton } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { Space } from '@/components/layout';
import { Image } from '@/components/media';
import { Button } from '@/components/forms';
import { Heading } from '@/components/typography';
import { ImageProps } from '@/components/media/Image/Image';
import { classes } from '@/utils/helpers';
import styles from '@/components/display/Card/Card.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type CardContextProps = typeof defaultValue & ElementSkeleton & ElementLink;

const defaultValue = {};

const CardContext = createContext<CardContextProps>(defaultValue);

const useCardContext = () => useContext(CardContext);

/* -------------------------------------------------------------------------- */
/** CardImage (child component) **/
/* -------------------------------------------------------------------------- */

export type CardImageProps = ImageProps;

const CardImage = (props: CardImageProps) => {
  const { href, skeleton } = useCardContext();

  return (
    <Image
      alt="image"
      skeleton={skeleton}
      href={href}
      {...props}
      className={classes(styles.image, href && styles.linkable, props.className)}
    />
  );
};

/* -------------------------------------------------------------------------- */
/** CarAction (child component) **/
/* -------------------------------------------------------------------------- */

type CardActionProps = ElementHTML & {
  icon: IconType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const CardAction = ({ className, icon: Icon, onClick }: CardActionProps) => {
  useCardContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    onClick && onClick(event);
  };

  return (
    <Button
      clear
      ariaLabel="action"
      className={classes(styles.action, className)}
      onClick={handleClick}>
      <Icon className={styles.actionIcon} />
    </Button>
  );
};

/* -------------------------------------------------------------------------- */
/** CarActions (child component) **/
/* -------------------------------------------------------------------------- */

type CardActionsProps = ElementHTML & ElementChildren<JSX.Element | Array<JSX.Element>>;

const CardActions = ({ className, children }: CardActionsProps) => {
  useCardContext();

  return (
    <Space justify="end" gap={8} className={classes(styles.actions, className)}>
      {children}
    </Space>
  );
};

const CardActionsWithChildrenFiltered = withChildrenFiltered(CardActions, {
  Item: CardAction
});

/* -------------------------------------------------------------------------- */
/** CardBody (child component) **/
/* -------------------------------------------------------------------------- */

type CardBodyProps = ElementHTML & {
  title: string;
  description?: string;
  maxLines?: number;
};

const CardBody = ({ className, title }: CardBodyProps) => {
  const { href, skeleton } = useCardContext();

  if (skeleton || !title) {
    return null;
  }

  return (
    <Space direction="column" gap={2} className={classes(styles.body, className)}>
      <Heading href={href} className={classes(styles.heading, href && styles.linkable)}>
        {title}
      </Heading>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** Card (main component) **/
/* -------------------------------------------------------------------------- */

export type CardProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<Array<JSX.Element>> &
  ElementSkeleton &
  ElementLink & {
    onClick: MouseEventHandler<HTMLDivElement>;
  };

const defaultProps = {
  children: []
};

const Card = ({ children, className, skeleton, href, onClick }: CardProps) => {
  return (
    <CardContext.Provider value={{ href, skeleton }}>
      <div className={classes(styles.wrapper, className)} onClick={onClick}>
        {children}
      </div>
    </CardContext.Provider>
  );
};

Card.defaultProps = defaultProps;

const CardWithChildrenFiltered = withChildrenFiltered(Card, {
  Image: CardImage,
  Body: CardBody,
  Actions: CardActionsWithChildrenFiltered
});

export default CardWithChildrenFiltered;
