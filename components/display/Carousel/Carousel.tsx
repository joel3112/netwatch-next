import { createContext, useContext, cloneElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  SwiperOptions
} from 'swiper';
import { IconType } from 'react-icons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ElementChildren, ElementHTML } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/components/display/Carousel/Carousel.module.scss';

SwiperCore.use([EffectFade, Parallax, Autoplay, Mousewheel, Navigation, Pagination]);

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

const CarouselItem = ({ children, className, style }: CarouselItemProps) => {
  useCarouselContext();

  return (
    <div className={classes(className)} style={style}>
      {children}
    </div>
  );
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
    slidesPerView?: number;
    spacing?: number;
    effectFade?: boolean;
    loop?: boolean;
    offset?: number;
  };

const defaultProps = {
  children: [],
  spacing: 2,
  offset: 0
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
  pagination,
  slidesPerView,
  spacing,
  autoplay,
  effectFade,
  loop,
  offset
}: CarouselProps) => {
  const settings: SwiperOptions = {
    speed: 500,
    loop,
    loopedSlides: 1,
    parallax: true,
    allowTouchMove: true,
    slidesPerView: 'auto',
    slidesPerGroup: slidesPerView || 1,
    spaceBetween: spacing,
    navigation: navigation
      ? {
          prevEl: `.${styles.prev}`,
          nextEl: `.${styles.next}`,
          disabledClass: styles.buttonNavigationDisabled
        }
      : false,
    pagination: pagination
      ? {
          clickable: true,
          clickableClass: styles.paginationBulletsClass,
          bulletClass: styles.paginationBulletClass,
          bulletActiveClass: styles.paginationBulletActiveClass
        }
      : false,
    autoplay: Boolean(autoplay) && {
      delay: 5000,
      pauseOnMouseEnter: true
    },
    ...(effectFade || (slidesPerView === 1 && navigation) || pagination
      ? {
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        }
      : {}),
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    },
    slidesOffsetBefore: !pagination ? offset : 0,
    slidesOffsetAfter: !pagination ? offset : 0
  };

  return (
    <CarouselContext.Provider value={{}}>
      <Swiper
        role="list"
        {...settings}
        className={classes(styles.wrapper, className)}
        style={{ width: `calc(100% + 2 * ${offset}px)`, marginLeft: -1 * offset }}>
        {navigation && renderNavigationButton('prev', FiChevronLeft)}
        {navigation && renderNavigationButton('next', FiChevronRight)}
        {children.map((element: JSX.Element, index) => (
          <SwiperSlide
            key={index}
            className={classes(styles.item)}
            style={{
              width: pagination
                ? '100%'
                : `calc((100% - ${50}px - ${spacing * Number(slidesPerView)}px) / ${slidesPerView})`
            }}>
            {cloneElement(element, { ...element.props })}
          </SwiperSlide>
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
