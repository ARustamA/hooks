import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { URL_FOR_IMAGE } from '@/common/config/baseApi';
import { FullSlyderImage } from './FullSlyderImage';
import { FC, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { RxDotFilled } from 'react-icons/rx';

type IProp = {
  data: {
    link: string;
  }[];
};
export const Slider: FC<IProp> = ({ data }) => {
  const [transition, setTransition] = useState<'slide_l' | 'slide_r'>('slide_r');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFull, setOpenFull] = useState(false);
  const handlers = useSwipeable({
    onSwipedRight: () => prevSlide(),
    onSwipedLeft: () => nextSlide()
  });

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight':
        nextSlide();
        break;
      case 'ArrowLeft':
        prevSlide();
        break;
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, transition]);

  const prevSlide = () => {
    if (transition === 'slide_r') setTransition('slide_l');
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    if (transition === 'slide_l') setTransition('slide_r');
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  // let opacity = 1;
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    // opacity = currentIndex === slideIndex ? 1 : 0;
  };

  return (
    <>
      <div
        className="max-w-[1400px] w-full h-full relative group bg-inherit 
      flex items-center justify-center">
        <img
          src={`${URL_FOR_IMAGE + data[currentIndex].link}`}
          alt="image"
          {...handlers}
          className={`rounded-lg w-full duration-500 flex-shrink-0`}
          // onClick={() => setOpenFull(true)}
        />

        {/* Left Arrow */}
        <div
          className="hidden sm:group-hover:block absolute top-[50%] -translate-x-0 
       translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20  cursor-pointer">
          <BiChevronLeftCircle onClick={prevSlide} size={25} />
        </div>
        {/* Right Arrow */}
        <div
          className="hidden sm:group-hover:block absolute top-[50%] -translate-x-0 
        translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20  cursor-pointer">
          <BiChevronRightCircle onClick={nextSlide} size={25} />
        </div>

        <FullSlyderImage data={data} isOpenModal={openFull} setIsOpenModal={setOpenFull} />
      </div>
      <div className="flex justify-center items-end">
        {data.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'active' : ''}`}>
            <RxDotFilled
              className={`text-white ${
                slideIndex === currentIndex ? 'text-second_red' : 'text-blue3'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
};
