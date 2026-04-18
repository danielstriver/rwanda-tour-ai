import { Box, HStack, Image } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useAutoSlide } from "../../hooks/useAutoSlide";

interface ExperienceImageCarouselProps {
  images: string[];
  alt: string;
  minHeight?: string | number;
}

const MotionImage = motion.create(Image);

export function ExperienceImageCarousel({
  images,
  alt,
  minHeight = 260,
}: ExperienceImageCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { activeIndex, setActiveIndex } = useAutoSlide(images.length, 3200, isHovered);

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH={minHeight}
      h="100%"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <MotionImage
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${alt} image ${activeIndex + 1}`}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          initial={{ opacity: 0, x: 34, scale: 1.02 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -34, scale: 1.01 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </AnimatePresence>

      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-t, rgba(7, 13, 18, 0.82), rgba(7, 13, 18, 0.08) 48%, rgba(7, 13, 18, 0.04))"
      />

      <HStack position="absolute" left={4} bottom={4} spacing={2}>
        {images.map((image, index) => (
          <Box
            key={image}
            as="button"
            type="button"
            aria-label={`View slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            w={activeIndex === index ? 8 : 2.5}
            h={2.5}
            rounded="full"
            bg={activeIndex === index ? "white" : "whiteAlpha.500"}
            transition="all 0.2s ease"
          />
        ))}
      </HStack>
    </Box>
  );
}
