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

interface LayoutPositions {
  cardTops: number[]
  endTop: number
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

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight
}

function readScrollTop(
  lenis: Lenis | null,
  scroller: HTMLDivElement | null,
  useWindowScroll: boolean,
  useNativeScroll: boolean,
) {
  if (useWindowScroll && useNativeScroll) {
    return window.scrollY
  }
  if (lenis) return lenis.scroll
  if (useWindowScroll) return window.scrollY
  return scroller?.scrollTop ?? 0
}

function clampScrollTop(scrollTop: number, containerHeight: number) {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - containerHeight)
  return Math.max(0, Math.min(scrollTop, maxScroll))
}

function measureLayoutPositions(
  cards: HTMLElement[],
  endElement: HTMLElement | null,
  scrollTop: number,
): LayoutPositions {
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
  const layoutRef = useRef<LayoutPositions>({ cardTops: [], endTop: 0 })
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map())

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

    layoutRef.current = measureLayoutPositions(cardsRef.current, endElement, scrollTop)
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller || !cardsRef.current.length) return

    const containerHeight = useWindowScroll ? getViewportHeight() : scroller.clientHeight
    const rawScrollTop = readScrollTop(
      lenisRef.current,
      scroller,
      useWindowScroll,
      useNativeScrollRef.current,
    )
    const scrollTop = useWindowScroll
      ? clampScrollTop(rawScrollTop, containerHeight)
      : rawScrollTop

    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    const { cardTops, endTop: endElementTop } = layoutRef.current

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = cardTops[i] ?? 0
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
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
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none'

        card.style.transform = transform
        card.style.filter = filter

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
      card.style.transform = 'translateZ(0)'

      if (useNativeScroll) {
        card.style.willChange = 'transform'
        card.style.perspective = 'none'
      } else {
        card.style.willChange = 'transform, filter'
        card.style.perspective = '1000px'
      }
    })

    remeasureLayout()
    updateCardTransforms()

    let lenis: Lenis | null = null

    if (useWindowScroll && !useNativeScroll) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: false,
      })
    } else if (!useWindowScroll) {
      const content = scroller.querySelector('.scroll-stack-inner')
      if (!content) return () => undefined

      lenis = new Lenis({
        wrapper: scroller,
        content: content as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: useNativeScroll ? 1 : 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: !useNativeScroll,
        syncTouchLerp: 0.075,
      })
    }

    lenisRef.current = lenis

    const onResize = () => {
      lenis?.resize()
      remeasureLayout()
      updateCardTransforms()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    const visualViewport = window.visualViewport
    visualViewport?.addEventListener('resize', onResize)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(scroller)

    const raf = (time: number) => {
      lenis?.raf(time)
      updateCardTransforms()
      animationFrameRef.current = requestAnimationFrame(raf)
    }

    animationFrameRef.current = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      visualViewport?.removeEventListener('resize', onResize)
      resizeObserver.disconnect()

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      lenis?.destroy()
      lenisRef.current = null
      useNativeScrollRef.current = false
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      layoutRef.current = { cardTops: [], endTop: 0 }
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
