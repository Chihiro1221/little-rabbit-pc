<template>
    <div class="xtx-goods-page" v-if="goods">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
                <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
                <transition name="fade-right" mode="out-in">
                    <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
                </transition>
            </XtxBread>
            <!-- 商品信息 -->
            <div class="goods-info">
                <div class="media">
                    <GoodsImage :images="goods.mainPictures" />
                    <!-- 销售推荐 -->
                    <GoodsSales />
                </div>
                <div class="spec">
                    <!-- 商品标题参数 -->
                    <GoodName :goods="goods" />
                    <!-- sku模块 -->
                    <GoodSku :goods="goods" skuId="1369155872197971970" @change="changeSku" />
                </div>
            </div>
            <!-- 商品推荐 -->
            <GoodsRelevant />
            <!-- 商品详情 -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品+评价 -->
                    <div class="goods-tabs"></div>
                    <!-- 注意事项 -->
                    <div class="goods-warn"></div>
                </div>
                <!-- 24热榜+专题推荐 -->
                <div class="goods-aside"></div>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsRelevant from "./components/goods-relevant";
import GoodsImage from "./components/goods-image";
import GoodsSales from "./components/goods-sales";
import GoodName from "./components/goods-name";
import GoodSku from "./components/goods-sku";
import { findGoods } from "@/api/product";
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
    name: "XtxGoodsPage",
    components: { GoodsRelevant, GoodsImage, GoodsSales, GoodName, GoodSku },
    setup() {
        const goods = useGoods();
        function changeSku(sku) {
            if (sku.skuId) {
                // 获得sku组件传递的信息之后修改页面的价格显示
                goods.value.price = sku.price;
                goods.value.oldPrice = sku.oldPrice;
                goods.value.inventory = sku.inventory;
            }
        }
        return { goods, changeSku };
    },
};
function useGoods() {
    const goods = ref(null);
    const route = useRoute();
    watch(
        () => route.params.id,
        async (newValue) => {
            if (newValue && route.path === `/product/${newValue}`) {
                goods.value = null;
                const { result } = await findGoods(newValue);
                nextTick(() => (goods.value = result));
            }
        },
        { immediate: true }
    );
    return goods;
}
</script>

<style scoped lang="less">
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }
    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}
.goods-footer {
    display: flex;
    margin-top: 20px;
    .goods-article {
        width: 940px;
        margin-right: 20px;
    }
    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}
.goods-tabs {
    min-height: 600px;
    background: #fff;
}
.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>
