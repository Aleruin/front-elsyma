new Vue({
    el: '#modal-auth',
    data: {
        showModal: true,
        urlAddr: "usr/hash.txt",
        userLogin: "",
        userHash: "",
        outerHash: "",
        emptyField: false,
        errorData: false
    },
    methods: {
        isEmptyPassword: function() {
            if (document.querySelector('input[type="password"]').value != "") {
                return false
            } else {
                return true
            }
        },
        isEmptyLogin: function() {
            if (document.querySelector('input[name="username"]').value != "") {
                return false
            } else {
                return true
            }
        },
        isEmptyBoth: function() {
            if (this.isEmptyLogin() && this.isEmptyPassword()) {
                return true
            } else {
                return false
            }
        },
        // compareHashesHTTP: function() {
        //     let self = this

        //     this.compareRequest()
        //     .then(function(res) {
        //         let hash = res.slice(0, 64)
        //         let selfHash = self.getHash()

        //         if (selfHash == hash) {
        //             self.showModal = false
                    
        //         } else {
        //             alert("Введенные логин и пароль не совпадают")
        //         }
        //     })
        // },
        compareHashesJSON: function() {
            let self = this

            this.getJSON()
            .then(function(res) {
                if (self.isEmptyBoth()) {   
                    self.emptyField = true
                    return
                }

                let parsedRes = JSON.parse(res)
                let logins = Object.keys(parsedRes)
                let userLogin = self.getLogin()    //перенести проверку поля на пустое значение в isEmptyLogin
                let selfHash = self.getHash()      //перенести проверку поля на пустое значение в isEmptyPassword

                for (let login in logins) {
                    if (userLogin == logins[login]) {
                        let hash = parsedRes[userLogin].slice(0, 64)

                        if (selfHash == hash) {
                            self.showModal = false
                        } else {
                            self.errorData = true
                        }
                    }
                }
            })
        },
        getLogin: function() {
            if (this.isEmptyLogin()) {
                this.emptyField = true
                return 
            } else {
                return this.userLogin = "" + document.querySelector('input[name="username"]').value
            }
        },
        getHash: function() {
            if (this.isEmptyPassword()) {
                this.emptyField = true
                return
            } else {
                return this.userHash = "" + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash("" + document.querySelector('input[type="password"]').value))
            }
        },
        compareRequest: function() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "usr/hash.txt");
                xhr.onload = () => resolve(xhr.responseText);
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
        },
        getJSON: function() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "usr/roles.json");
                xhr.onload = () => resolve(xhr.response);
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
        }
    },
    components: {
        'warning-error': {
            data: function() {
                return {
                    activeStyle: 'red',
                    fontSize: '10px',
                    paddingLeft: '5px'
                }
            },
            template: '<div><p :style="{ color: activeStyle, fontSize: fontSize, paddingLeft: paddingLeft }">Неверно введен логин пользователя или пароль!</p></div>'
        },
        'empty-error': {
            data: function() {
                return {
                    activeStyle: 'red',
                    fontSize: '10px',
                    paddingLeft: '5px'
                }
            },
            template: '<div><p :style="{ color: activeStyle, fontSize: fontSize, paddingLeft: paddingLeft }">Пожалуйста, заполните все поля!</p></div>'
        }
    }
});