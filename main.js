const pa = Vue.component('pa', {
    template: `
        <div class="tabbar">
            <span class="totalpage" :totalPage="totalPage">共有{{totalPage}}页</span>
            <button :class="{'disabled': paging == 1}" @click="setCurrent(1)" class="firstpage">首页</button>
            <button :class="{'disabled': paging == 1}" @click="setCurrent(paging-1)" class="prepage">上一页</button>
            <div class="paging"><button v-for="p in grouplist" :class="{'active': paging == p.val}" @click="setCurrent(p.val)" class="pager">{{ p.text }}</button></div>
            <button :class="{'disabled': paging == totalPage}" @click="setCurrent(paging+1)" class="nextpage">下一页</button>
            <button :class="{'disabled': paging == totalPage}" @click="setCurrent(totalPage)" class="lastpage">尾页</button>
        </div>
    `,
    data() {
        return {
            paging: this.currentPage
        }
    },
    props: {
        total: { // 数据总条数
            type: Number,
            default: 0
        },
        display: { // 每页显示条数
            type: Number,
            default: 10
        },
        currentPage: { // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: { // 分页条数
            type: Number,
            default: 9,
        }
    },
    computed: {
        totalPage() { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist() { // 获取分页页码
            let pageAmount = this.totalPage;
            let pageList = [];
            let start, end, middle = Math.ceil(this.pagegroup / 2),
                nearLeft = this.paging <= middle,
                nearRight = this.paging >= pageAmount - middle;
            if (nearLeft) {
                start = 1;
                end = this.pagegroup;
            } else if (nearRight) {
                start = pageAmount - this.pagegroup;
                end = pageAmount;
            } else {
                start = this.paging - middle + 1;
                end = this.paging + middle - 1;
            }
            if (start < 1) {
                start = 1;
            }
            if (end > pageAmount) {
                end = pageAmount;
            }
            for (let i = start; i <= end; i++) {
                pageList.push({
                    text: i,
                    val: i,
                })
            }
            return pageList;
        }
    },
    methods: {
        setCurrent(idx) {
            if (this.paging != idx && idx > 0 && idx < this.totalPage + 1) {
                this.paging = idx;
                this.$emit('pagechange', this.paging);
            }
        }
    }
});
new Vue({
    el: "#app",
    data: {
        total: 150, // 记录总条数
        paging: 1, // 当前的页数
    },
    methods: {
        pagechange: function (currentPage) {
            alert("当前正在处理第" + currentPage + "页");
        }
    },
    components: {
        'v-pa': pa,
    }
})