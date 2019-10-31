Vue.component('type-signal-menu', {
    data: function(){
        return {
            insets: [
                {name: "Аналоговые сигналы"},
                {name: "Дискретные сигналы"},
                {name: "Диаграммы"}
            ]
        }
    },
    template: '<div><div class="signal-type" v-for="ins in insets"><p>{{ ins.name }}</p></div></div>'
});

Vue.component('io-menu', {
    data: function(){
        return {
            insets: [
                {name: "Аналоговые входы"},
                {name: "Дискретные входы"}
            ]
        }
    },
    template: '<div><div class="io-type" v-for="ins in insets"><p>{{ ins.name }}</p></div></div>'
});

new Vue({
    el: '#left-menu',
    data: {

    }
});

new Vue({
    el: '#top-menu',
    data: {

    }
});
