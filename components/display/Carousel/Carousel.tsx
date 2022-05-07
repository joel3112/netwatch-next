import { createContext, useContext, cloneElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  EffectFade,
  SwiperOptions
} from 'swiper';
import { IconType } from 'react-icons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ElementChildren, ElementHTML } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/components/display/Carousel/Carousel.module.scss';

SwiperCore.use([EffectFade, Autoplay, Mousewheel, Navigation, Pagination]);

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type CarouselContextProps = typeof defaultValue;

const defaultValue = {};

const CarouselContext = createContext<CarouselContextProps>(defaultValue);

const useCarouselContext = () => useContext(CarouselContext);

/* -------------------------------------------------------------------------- */
/** CarouselItem (child component) **/
/* -------------------------------------------------------------------------- */

type CarouselItemProps = ElementHTML & ElementChildren<JSX.Element>;

const CarouselItem = ({ children, className }: CarouselItemProps) => {
  useCarouselContext();

  return <div className={classes(styles.item, className)}>{children}</div>;
};

/* -------------------------------------------------------------------------- */
/** Carousel (main component) **/
/* -------------------------------------------------------------------------- */

export type CarouselProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    navigation?: boolean;
    pagination?: boolean;
    autoplay?: boolean;
    slidesPerView?: number | 'auto';
    spacing?: number;
    effectFade?: boolean;
  };

const defaultProps = {
  children: [],
  spacing: 2
};

const renderNavigationButton = (state: 'prev' | 'next', Icon: IconType) => {
  return (
    <Button className={classes(styles.buttonNavigation, styles[state])}>
      <Icon />
    </Button>
  );
};

const Carousel = ({
  className,
  children,
  navigation,
  slidesPerView,
  spacing,
  autoplay,
  effectFade
}: CarouselProps) => {
  const settings: SwiperOptions = {
    speed: 500,
    allowTouchMove: false,
    slidesPerView,
    slidesPerGroup: slidesPerView === 'auto' ? 1 : slidesPerView,
    spaceBetween: spacing,
    navigation: navigation
      ? {
          prevEl: `.${styles.prev}`,
          nextEl: `.${styles.next}`,
          disabledClass: styles.buttonNavigationDisabled
        }
      : {},
    autoplay: Boolean(autoplay) && {
      delay: 5000,
      pauseOnMouseEnter: true
    },
    ...(effectFade ? { effect: 'fade' } : {}),
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    }
  };

  return (
    <CarouselContext.Provider value={{}}>
      <Swiper role="list" {...settings} className={classes(styles.wrapper, className)}>
        {navigation && renderNavigationButton('prev', FiChevronLeft)}
        {navigation && renderNavigationButton('next', FiChevronRight)}
        {children.map((element: JSX.Element, index) => (
          <SwiperSlide key={index}>{cloneElement(element, { ...element.props })}</SwiperSlide>
        ))}
      </Swiper>
    </CarouselContext.Provider>
  );
};

Carousel.defaultProps = defaultProps;

const CarouselWithChildrenFiltered = withChildrenFiltered<CarouselProps>(Carousel, {
  Item: CarouselItem
});

export default CarouselWithChildrenFiltered;
