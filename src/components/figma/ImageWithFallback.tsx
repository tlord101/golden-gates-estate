import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null)

  const makePicsumFallback = (originalSrc?: string) => {
    if (!originalSrc) return null
    // Use a deterministic-ish seed derived from the original URL
    const seed = encodeURIComponent(originalSrc).slice(0, 32)
    return `https://picsum.photos/1200/800?random=${seed}`
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const original = (e.target as HTMLImageElement).getAttribute('src') || ''
    // If we haven't tried a fallback yet, try Picsum (useful when source.unsplash.com is unavailable)
    if (!fallbackSrc) {
      const fb = makePicsumFallback(original)
      if (fb) {
        setFallbackSrc(fb)
        return
      }
    }
    setDidError(true)
  }

  const { src, alt, className, ...rest } = props
  const finalSrc = fallbackSrc || (src as string | undefined)

  if (didError) {
    return (
      <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}>
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return <img src={finalSrc} alt={alt} className={className} {...rest} onError={handleError} />
}
