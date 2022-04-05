import NextImage from 'next/image';

type ImageProps = {
  width: string;
  height: string;
  src: string;
  alt: string;
  className?: string;
};

export function Image({ className, ...props }: ImageProps) {
  return (
    <div className={className}>
      <NextImage {...props} />
    </div>
  );
}
