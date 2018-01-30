<template>
    <section>
        <div>
            正常页面（未进行编译预渲染）
        </div>
        <div>
            created: <span>{{created}}</span>
        </div>
        <div>
            timeout: <span :class="{'blank-space': !timeout}">{{timeout}}</span>
        </div>
        <div>
            mounted: <span :class="{'blank-space': !mounted}">{{mounted}}</span>
        </div>
        <button @click="clickBtn">click me</button>
        <div v-if="show">
            show
        </div>
        <div>
            show: {{show}}
        </div>
    </section>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            header: 'header',
            created: '',
            timeout: '',
            mounted: '',
            show: false,
        };
    },
    created () {
        this.created = 'created';
        setTimeout(() => {
            this.timeout = 'timeout';
        }, 2000);
        this.show = true;
    },
    mounted () {
        this.mounted = 'mounted';
    },
    methods: {
        clickBtn () {
            this.show = !this.show;
        }
    }
};
</script>

<style lang="scss">

body {
    font-size: 16px;
    button {
        font-size: 16px;
        background-color: #fff;
        border: 0.01rem solid #000;
    }
    .blank-space {
        display: inline-block;
        width: 100px;
        height: 1.5em;
        line-height: 1.5em;
        background-color: #eee;
    }
}

</style>
