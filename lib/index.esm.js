import { ref, toRefs, computed, watch, onMounted } from 'vue-demi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useVirtualList(list, options) {
    var _a;
    const container = ref();
    const range = ref({
        start: 0,
        end: 0
    });
    const { itemHeight, itemWidth, overscan, direction } = toRefs(options);
    const overscanValue = (overscan === null || overscan === void 0 ? void 0 : overscan.value) || 0;
    const directionValue = (direction === null || direction === void 0 ? void 0 : direction.value) || 'vertical';
    const itemSizeValue = ((_a = (directionValue === 'vertical' ? itemHeight : itemWidth)) === null || _a === void 0 ? void 0 : _a.value) || 0;
    const capacity = computed(() => {
        var _a, _b;
        const clientSize = directionValue === 'vertical'
            ? (_a = container.value) === null || _a === void 0 ? void 0 : _a.clientHeight : (_b = container.value) === null || _b === void 0 ? void 0 : _b.clientLeft;
        return container.value && itemSizeValue
            ? Math.ceil((clientSize || 0) / itemSizeValue)
            : 0;
    });
    const getOffset = (scrollDistance) => {
        return itemSizeValue ? scrollDistance / itemSizeValue : 0;
    };
    const calcListRange = () => {
        const element = container.value;
        if (element) {
            const offset = getOffset(directionValue === 'vertical' ? element.scrollTop : element.scrollLeft);
            const from = Math.floor(offset) - overscanValue;
            const to = Math.ceil(offset) + capacity.value + overscanValue + 1;
            range.value.start = Math.max(0, from);
            range.value.end = Math.min(to, list.value.length);
        }
    };
    const virtualList = computed(() => {
        return list.value
            .slice(range.value.start, range.value.end)
            .map((item, index) => {
            return {
                data: item,
                realIndex: index + range.value.start
            };
        });
    });
    const totalHeight = computed(() => {
        return list.value.length * itemSizeValue;
    });
    const style = computed(() => {
        return {
            marginTop: `${range.value.start * itemSizeValue}px`,
            marginBottom: `${totalHeight.value - range.value.end * itemSizeValue}px`,
            overflow: 'auto'
        };
    });
    const handleScroll = (e) => {
        e.preventDefault();
        calcListRange();
    };
    watch([list.value], calcListRange);
    onMounted(calcListRange);
    return {
        container,
        virtualList,
        style,
        refresh: calcListRange,
        handleScroll
    };
}

export default useVirtualList;
export { useVirtualList };
//# sourceMappingURL=index.esm.js.map
