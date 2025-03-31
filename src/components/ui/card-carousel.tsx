import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface CardCarouselProps {
  children: ReactNode[];
  title?: string;
  showNavigation?: boolean;
}

export function CardCarousel({ children, title, showNavigation = true }: CardCarouselProps) {
  return (
    <div className="relative">
      {title && (
        <h2 className="text-lg font-semibold mb-4 px-4 md:px-0">{title}</h2>
      )}
      
      <Swiper
        modules={[Navigation]}
        navigation={showNavigation}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },  // Tablet pequeno
          768: { slidesPerView: 3.2 },  // Tablet
          1024: { slidesPerView: 4.2 }, // Desktop pequeno
          1280: { slidesPerView: 6.2 }  // Desktop grande
        }}
        className="!px-4 !-mx-4 md:!px-0 md:!mx-0"
        wrapperClass="!items-stretch"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="!w-[48%] md:!w-[32%] lg:!w-[16%]">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 