import { Ref } from 'vue-demi';
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
declare function useVirtualList<T = any>(list: Ref<T[]>, options: VerticalOption | HorizontalOption): {
    container: Ref<HTMLElement | undefined>;
    virtualList: import("vue-demi").ComputedRef<{
        data: T;
        realIndex: number;
    }[]>;
    style: import("vue-demi").ComputedRef<{
        marginTop: string;
        marginBottom: string;
        overflow: string;
    }>;
    refresh: () => void;
    handleScroll: (e: Event) => void;
};
export { useVirtualList };
export default useVirtualList;
