import { ref, Ref, onMounted, computed, watch } from 'vue-demi'

export interface BaseOption {
  direction?: 'vertical' | 'horizontal';
  itemHeight?: number;
  itemWidth?: number;
  overscan?: number;
}

export interface VerticalOption extends BaseOption {
  direction?: 'vertical';
  itemHeight: number;
}

export interface HorizontalOption extends BaseOption {
  direction: 'horizontal';
  itemWidth: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useVirtualList <T = any> (list: Ref<T[]>, options: VerticalOption | HorizontalOption) {
  const container = ref<HTMLElement>()

  const range = ref({
    start: 0,
    end: 0
  })

  const {
    itemHeight,
    itemWidth,
    overscan = 0,
    direction = 'vertical'
  } = options

  const itemSizeValue = (direction === 'vertical' ? itemHeight : itemWidth) || 0

  const capacity = computed(() => {
    const clientSize = direction === 'vertical'
      ? container.value?.clientHeight
      : container.value?.clientLeft

    return container.value && itemSizeValue
      ? Math.ceil((clientSize || 0) / itemSizeValue)
      : 0
  })

  const getOffset = (scrollDistance: number): number => {
    return itemSizeValue ? scrollDistance / itemSizeValue : 0
  }

  const calcListRange = () => {
    const element = container.value
    if (element) {
      const offset = getOffset(
        direction === 'vertical' ? element.scrollTop : element.scrollLeft
      )

      const from = Math.floor(offset) - overscan
      const to = Math.ceil(offset) + capacity.value + overscan + 1

      range.value.start = Math.max(0, from)
      range.value.end = Math.min(to, list.value.length)
    }
  }

  const virtualList = computed(() => {
    return (list.value as T[])
      .slice(range.value.start, range.value.end)
      .map((item, index) => {
        return {
          data: item,
          realIndex: index + range.value.start
        }
      })
  })

  const totalHeight = computed(() => {
    return list.value.length * itemSizeValue
  })

  const style = computed(() => {
    return {
      marginTop: `${range.value.start * itemSizeValue}px`,
      marginBottom: `${totalHeight.value - range.value.end * itemSizeValue}px`,
      overflow: 'auto'
    }
  })

  const handleScroll = (e: Event) => {
    e.preventDefault()
    calcListRange()
  }

  watch([list.value], calcListRange)

  onMounted(calcListRange)

  return {
    container,
    virtualList,
    style,
    refresh: calcListRange,
    handleScroll
  }
}

export { useVirtualList }

export default useVirtualList
