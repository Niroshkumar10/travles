import { cn } from '@/lib/cn'

export function LazyImage({ src, alt, className, width, height, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      className={cn('object-cover', className)}
      {...props}
    />
  )
}
