var vm = new Vue({
    el: "#app",
    data: {
        items: "",
        tabBars: [{
                id: 1,
                text: "全部",
                style: 'success'
            },
            {
                id: 2,
                text: "已完成",
                style: 'primary'
            },
            {
                id: 3,
                text: "未完成",
                style: 'danger'
            }
        ],
        bg: false,
        adds: false,
        bgremoreindex: -1,
        type: "全部",
        addDate: ""
    },
    methods: {
        remore: function(index) {
            this.items.splice(index, 1)
        },
        opinion: function(index) {
            if (this.items[index].f) {
                this.remore(index)
            } else {
                this.bg = true;
                this.bgremoreindex = index;
            }
        },
        bgremore: function(bgremoreindex) {
            this.remore(bgremoreindex);
        },
        add: function() {
            this.adds = true;
            console.log(this.items)
        },
        addts: function() {
            var timestamp = (new Date()).getTime();

            this.items.push({
                id: timestamp,
                text: this.addDate,
                f: false
            });
            this.adds = false;
        }
    },
    created() {
        var t = "";
        axios.get('../data/data.json')
            .then(function(response) {
                console.log(response.data);
                return t = response.data
            }).then(t => this.items = t);
        console.log(this.items)
    },
    computed: {
        wangcheng: function() {
            return this.items.filter(function(i) {
                return i.f ? i : false;
            })
        },
        unwangcheng: function() {
            return this.items.filter(function(i) {
                return !i.f ? i : false;
            })
        },
        newItems: function() {
            if (this.type == "已完成") {
                return this.wangcheng;
            } else if (this.type == "未完成") {
                return this.unwangcheng;
            } else {
                return this.items;
            }
        }
    }
})