var outputList = new Vue({
    el: '#output-list',
    data: {
        dacItems: [
            {
                label: 'output-0',
                isActive: false,
                state: 'Состояние'
            },
            {
                label: 'output-1',
                isActive: false,
                state: 'Состояние'
            },
            {
                label: 'output-2',
                isActive: false,
                state: 'Состояние'
            },
            {
                label: 'output-3',
                isActive: false,
                state: 'Состояние'
            },
            {
                label: 'output-4',
                isActive: false,
                state: 'Состояние'
            }
        ],
        adcItems: [
            {
                label: 'output-0',
                isActive: false,
                state: 'Состояние', 
                value: 234
            },
            {
                label: 'output-1',
                isActive: false,
                state: 'Состояние',
                value: 74
            }
        ]
    },
    methods: {
        togglePurchased: function(item) {
            item.isActive = !item.isActive;
        }
    }
})
