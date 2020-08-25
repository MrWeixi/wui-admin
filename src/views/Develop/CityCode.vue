<template>
    <div>
    <city-code @cityCode="code" place="请选择城市"></city-code>
    </div>
</template>
<script>
import { CityCode } from '@/components'
export default {
    components: {
        CityCode
    },
    data() {
        return {

        };
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        code(e){
            console.log(e);
        }
    }
};
</script>

<style scoped lang="less">

</style>
