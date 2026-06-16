import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Slide {
  src: string;
  alt?: string;
}

interface ImageLightboxProps {
  open: boolean;
  close: () => void;
  slides: (string | { url: string; title?: string })[];
  index?: number;
}

export default function ImageLightbox({ open, close, slides, index = 0 }: ImageLightboxProps) {
  if (!slides || slides.length === 0) return null;

  const formattedSlides: Slide[] = slides.map((s) => {
    if (typeof s === 'string') {
      return { src: s, alt: 'Gallery image' };
    }
    return { src: s.url, alt: s.title || 'Gallery image' };
  });

  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={formattedSlides}
      carousel={{ finite: false }}
    />
  );
}
