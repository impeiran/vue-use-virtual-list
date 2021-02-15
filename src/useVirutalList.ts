export interface VirtualListOption {
  direction?: 'vertical' | 'horizen',
  itemHeight: number,
  overscan?: number
}

export const useVirtualList = <T>(list: T, options: VirtualListOption) => {}