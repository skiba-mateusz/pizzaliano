import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageProps {
  src: string;
  srcSet?: string;
  alt: string;
  height: number;
  width: number;
  lazy?: boolean;
  fetch?: boolean;
  blurHash?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  srcSet,
  alt,
  height,
  width,
  lazy = false,
  fetch = false,
  blurHash = "LJFN*LD+0g-.}?NHIot659xs$#RQ",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (fetch) {
      setIsLoaded(true);
      return;
    }

    const img = new window.Image();
    img.src = src;

    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => {
        setIsLoaded(true);
      };
    }

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <>
      {isLoaded ? (
        <img
          className={classNames(
            "object-cover",
            {
              "fade-in": isLoaded && !fetch && lazy,
            },
            className
          )}
          src={src}
          srcSet={srcSet}
          alt={alt}
          height={height}
          width={width}
          loading={lazy ? "lazy" : undefined}
        />
      ) : (
        ""
      )}
      {!isLoaded ? (
        <Blurhash
          className={classNames("overflow-hidden", className)}
          hash={blurHash}
          height="auto"
          width="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      ) : (
        ""
      )}
    </>
  );
};
