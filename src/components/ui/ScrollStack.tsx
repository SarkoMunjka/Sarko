import {
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import './ScrollStack.css'

interface CardTransform {
  translateY: number
  scale: number
  rotation: number
  blur: number
}

interface LayoutMetrics {
  cardTops: number[]
  endTop: number
  containerHeight: number
}

export function ScrollStackItem({
  children,
  itemClassName = '',
}: {
  children: ReactNode
  itemClassName?: string
}) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  )
}

interface ScrollStackProps {
  children: ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

function prefersNativeTouchScroll() {
  return window.matchMedia('(pointer: coarse)').matches
}

function readScrollTop(
  lenis: Lenis | null,
  scroller: HTMLDivElement | null,
  useWindowScroll: boolean,
  useNativeScroll: boolean,
) {
  if (useWindowScroll && useNativeScroll) {
    return document.documentElement.scrollTop || window.scrollY
  }
  if (lenis) return lenis.scroll
  if (useWindowScroll) return window.scrollY
  return scroller?.scrollTop ?? 0
}

function getStableViewportHeight() {
  return window.innerHeight
}

function measureLayoutPositions(
  cards: HTMLElement[],
  endElement: HTMLElement | null,
  scrollTop: number,
): Pick<LayoutMetrics, 'cardTops' | 'endTop'> {
  const cardTops = cards.map((card) => {
    const savedTransform = card.style.transform
    const savedFilter = card.style.filter

    card.style.transform = 'none'
    card.style.filter = 'none'

    const top = card.getBoundingClientRect().top + scrollTop

    card.style.transform = savedTransform
    card.style.filter = savedFilter

    return top
  })

  const endTop = endElement
    ? endElement.getBoundingClientRect().top + scrollTop
    : 0

  return { cardTops, endTop }
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const useNativeScrollRef = useRef(false)
  const cardsRef = useRef<HTMLElement[]>([])
  const layoutRef = useRef<LayoutMetrics>({
    cardTops: [],
    endTop: 0,
    containerHeight: 0,
  })
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map())
  const activeRef = useRef(false)

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(String(value))
  }, [])

  const remeasureLayout = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller || !cardsRef.current.length) return

    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement | null
    const scrollTop = readScrollTop(
      lenisRef.current,
      scroller,
      useWindowScroll,
      useNativeScrollRef.current,
    )

    const measured = measureLayoutPositions(cardsRef.current, endElement, scrollTop)
    const containerHeight = useWindowScroll
      ? getStableViewportHeight()
      : scroller.clientHeight

    layoutRef.current = {
      ...measured,
      containerHeight,
    }
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller || !cardsRef.current.length) return

    const { cardTops, endTop: endElementTop, containerHeight } = layoutRef.current
    if (!containerHeight) return

    const useNativeScroll = useNativeScrollRef.current
    const scrollTop = readScrollTop(
      lenisRef.current,
      scroller,
      useWindowScroll,
      useNativeScroll,
    )

    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = cardTops[i] ?? 0
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = useNativeScroll
        ? 1
        : 1 - scaleProgress * (1 - targetScale)
      const rotation = useNativeScroll || !rotationAmount
        ? 0
        : i * rotationAmount * scaleProgress

      let blur = 0
      if (blurAmount && !useNativeScroll) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardTops[j] ?? 0
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const newTransform: CardTransform = {
        translateY: useNativeScroll
          ? Math.round(translateY)
          : Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        lastTransform.translateY !== newTransform.translateY ||
        lastTransform.scale !== newTransform.scale ||
        lastTransform.rotation !== newTransform.rotation ||
        lastTransform.blur !== newTransform.blur

      if (hasChanged) {
        if (useNativeScroll) {
          card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0)`
          card.style.filter = 'none'
        } else {
          const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
          const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none'
          card.style.transform = transform
          card.style.filter = filter
        }

        lastTransformsRef.current.set(i, newTransform)
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card'),
    ) as HTMLElement[]

    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current
    const useNativeScroll = useWindowScroll && prefersNativeTouchScroll()
    useNativeScrollRef.current = useNativeScroll

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'

      if (useNativeScroll) {
        card.classList.add('scroll-stack-card--touch')
        card.style.transform = 'none'
        card.style.willChange = 'auto'
      } else {
        card.style.transform = 'translateZ(0)'
        card.style.willChange = 'transform, filter'
        card.style.perspective = '1000px'
      }
    })

    remeasureLayout()
    updateCardTransforms()

    const initLenis = () => {
      if (lenisRef.current || !useWindowScroll || useNativeScroll) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: false,
      })

      lenisRef.current = lenis
    }

    let lenis: Lenis | null = null

    if (!useWindowScroll) {
      const content = scroller.querySelector('.scroll-stack-inner')
      if (!content) return () => undefined

      lenis = new Lenis({
        wrapper: scroller,
        content: content as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      })

      lenisRef.current = lenis
      activeRef.current = true
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting

        if (entry.isIntersecting) {
          initLenis()
          remeasureLayout()
          updateCardTransforms()
        }
      },
      { rootMargin: '40% 0px 40% 0px', threshold: 0 },
    )

    let resizeTimer: number | undefined
    let disconnectResizeObserver: (() => void) | undefined
    let disconnectScrollListener: (() => void) | undefined

    const onResize = () => {
      const run = () => {
        lenisRef.current?.resize()
        remeasureLayout()
        updateCardTransforms()
      }

      if (useNativeScroll) {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(run, 350)
        return
      }

      run()
    }

    window.addEventListener('orientationchange', onResize)

    if (!useNativeScroll) {
      window.addEventListener('resize', onResize)
      window.visualViewport?.addEventListener('resize', onResize)

      const resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(scroller)
      disconnectResizeObserver = () => resizeObserver.disconnect()
    }

    if (useWindowScroll && useNativeScroll) {
      activeRef.current = true

      const onScroll = () => {
        updateCardTransforms()
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      disconnectScrollListener = () => window.removeEventListener('scroll', onScroll)
    }

    if (useWindowScroll && !useNativeScroll) {
      sectionObserver.observe(scroller)
    } else if (!useWindowScroll) {
      activeRef.current = true
    }

    const raf = (time: number) => {
      lenisRef.current?.raf(time)

      if (activeRef.current) {
        updateCardTransforms()
      }

      animationFrameRef.current = requestAnimationFrame(raf)
    }

    animationFrameRef.current = requestAnimationFrame(raf)

    return () => {
      sectionObserver.disconnect()
      window.removeEventListener('orientationchange', onResize)

      if (!useNativeScroll) {
        window.removeEventListener('resize', onResize)
        window.visualViewport?.removeEventListener('resize', onResize)
        disconnectResizeObserver?.()
      }

      disconnectScrollListener?.()

      if (resizeTimer) {
        window.clearTimeout(resizeTimer)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      lenisRef.current?.destroy()
      lenisRef.current = null
      activeRef.current = false
      useNativeScrollRef.current = false
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      layoutRef.current = { cardTops: [], endTop: 0, containerHeight: 0 }

      cards.forEach((card) => {
        card.classList.remove('scroll-stack-card--touch')
      })
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    remeasureLayout,
    updateCardTransforms,
  ])

  const scrollerClassName = [
    'scroll-stack-scroller',
    useWindowScroll ? 'scroll-stack-scroller--window' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={scrollerClassName} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  )
}
