const images = [
  {
    key: 'poster-1',
    src: 'https://cdn.dribbble.com/userupload/11140095/file/original-5bac44a88819cf9ac9df5eb1ca0fc8a9.jpg',
    rotation: -8,
    y: 25,
    alt: '',
  },
  {
    key: 'poster-2',
    src: 'https://cdn.dribbble.com/userupload/15952804/file/original-6ce78ab3587e12f6edf6be9bb929565a.jpg',
    rotation: -4,
    y: -30,
    alt: '',
  },
  {
    key: 'poster-3',
    src: 'https://cdn.dribbble.com/userupload/15632775/file/original-a0f5d45e75d7028ba95bbdd9c8328f4b.jpg',
    rotation: -2,
    y: 9,
    alt: '',
  },
  {
    key: 'poster-4',
    src: 'https://cdn.dribbble.com/users/1674522/screenshots/18751383/media/1bd49dfb19e8866efe24da3bf1735ccd.png',
    rotation: 0,
    y: 5,
    alt: '',
  },
  {
    key: 'poster-5',
    src: 'https://cdn.dribbble.com/userupload/15984729/file/original-54ce41eff758debbd15f8f1d9ba3897f.png',
    rotation: 4,
    y: 0,
    alt: '',
  },
  {
    key: 'poster-6',
    src: 'https://cdn.dribbble.com/userupload/14253704/file/original-69721201f58632128c3eba8c7690e872.jpg',
    rotation: 10,
    y: 15,
    alt: '',
  },
  {
    key: 'poster-7',
    src: 'https://cdn.dribbble.com/userupload/21824865/file/original-1f073ab7093c32949a8165526652bb93.jpg',
    rotation: 10,
    y: 20,
    alt: '',
  },
];

export const Hero = () => {
  return (
    <div className='mx-auto my-[10dvh] flex max-w-screen-xl flex-col items-center gap-16 overflow-x-hidden'>
      <div className='text-center font-comic font-semibold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl'>
        Your Hot Take Just
        <br />
        Forked Reality
      </div>
      <div className='!h-[16rem] relative mx-auto flex w-[32rem] flex-row items-center justify-center md:w-[64rem]'>
        {images.map((image, index) => {
          return (
            // biome-ignore lint/nursery/noImgElement: safe as no need to optimize
            <img
              alt='alt'
              src={image.src}
              key={image.key}
              className='poster-shadow absolute top-0 size-[10rem] rounded-2xl object-cover md:size-[14rem]'
              style={{
                transform: `rotate(${image.rotation}deg) translateY(${image.y}px)`,
                zIndex: index,
                left: `${(index / images.length) * 100}%`,
              }}
            />
          );
        })}
      </div>
      <div className='max-w-4xl text-wrap px-2 text-center font-comic font-semibold text-lg'>
        Enter a comic multiverse where debates fork realities! Battle rivals
        over pizza toppings, superheroes, and AI chaos. Earn points. Become
        legend. Warning: May cause existential laughter.
      </div>
    </div>
  );
};
