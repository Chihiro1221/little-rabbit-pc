<template>
    <div class="xtx-checkbox" @click="change">
        <i v-if="checked" class="iconfont icon-checked"></i>
        <i v-else class="iconfont icon-unchecked"></i>
        <span v-if="$slots.default"><slot /></span>
    </div>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
    name: 'XtxCheckbox',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { emit }) {
        // 使用useVModel之后会自动将我们的props中属性变成响应式的
        const checked = useVModel(props, 'modelValue', emit)

        function change () {
            checked.value = !checked.value
            emit('change', checked.value)
        }

        return {
            checked,
            change
        }
    }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: @xtxColor;

        ~ span {
            color: @xtxColor;
        }
    }

    i {
        position: relative;
        top: 1px;
    }

    span {
        margin-left: 2px;
    }
}
</style>
