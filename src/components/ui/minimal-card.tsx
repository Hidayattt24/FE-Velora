import * as React from "react"
import Image from "next/image"

interface MinimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface MinimalCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
}

interface MinimalCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface MinimalCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function MinimalCard({ children, className, ...props }: MinimalCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function MinimalCardImage({ src, alt = "", className, ...props }: MinimalCardImageProps) {
  return (
    <div className="aspect-[16/9] relative overflow-hidden" {...props}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${className}`}
      />
    </div>
  )
}

export function MinimalCardTitle({ children, className, ...props }: MinimalCardTitleProps) {
  return (
    <h3 
      className={`text-xl font-semibold text-gray-800 px-6 pt-6 group-hover:text-[#D291BC] transition-colors ${className}`} 
      {...props}
    >
      {children}
    </h3>
  )
}

export function MinimalCardDescription({ children, className, ...props }: MinimalCardDescriptionProps) {
  return (
    <p 
      className={`text-gray-600 px-6 pb-6 ${className}`} 
      {...props}
    >
      {children}
    </p>
  )
} 