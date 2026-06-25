import React from 'react'
import { motion } from 'motion/react'

export interface TestimonialItem {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsColumn(props: {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="w-full max-w-xs rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#121212] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:p-10"
                  key={i}
                >
                  <div className="text-[15px] leading-[1.55] text-gray-700 dark:text-gray-300 sm:text-[16px]">
                    {text}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <div className="text-[14px] font-semibold leading-5 tracking-tight text-gray-900 dark:text-white">
                        {name}
                      </div>
                      <div className="text-[13px] leading-5 tracking-tight text-gray-600 dark:text-gray-400">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
