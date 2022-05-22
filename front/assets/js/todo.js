Vue.use(window["vue-js-modal"].default);
Vue.component("togglebutton", {
    props: ["label", "name"],
    template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
        <label v-bind:for="name">
          <span class="togglebutton-label">{{ label }}</span>
          <span class="tooglebutton-box"></span>
        </label>
        <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
    </div>`,
    model: {
        prop: "checked",
        event: "change",
    },
    data: function () {
        return {
            isactive: false,
        };
    },
    methods: {
        onToogle: function () {
            this.$emit("clicked", this.isactive);
        },
    },
});

var modal = new Vue({
    el: "#modal",
    data: {
        status: ["not started", "todo", "in progress", "done"],
        selectedStatus: 0,
        selectedItem: null,
    },
    methods: {
        show: function (item) {
            this.$modal.show("Status");
            if (item) {
                this.selectedStatus = this.status.indexOf(item.status);
                this.selectedItem = item;
            }
        },
        hide: function () {
            this.$modal.hide("Status");
        },
        onStatusChange: function (status) {
            this.selectedItem.status = status;
            this.selectedStatus = this.status.indexOf(status);
        }
    },
});

var todolist = new Vue({
    el: "#todolist",
    data: {
        newitem: "",
        sortByStatus: false,
        todo: [],
    },
    methods: {
        addItem: function () {
            this.todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false });
            this.newitem = "";
        },
        deleteItemFromList: function (item) {
            let index = this.todo.indexOf(item);
            this.todo.splice(index, 1);
        },
        clickontoogle: function (active) {
            this.sortByStatus = active;
        },
        openModal: function (item) {
            modal.show(item);
        },
    },
    computed: {
        todoByStatus: function () {
            if (!this.sortByStatus) {
                return this.todo;
            }

            var sortedArray = [];
            var doneArray = this.todo.filter(function (item) {
                return item.status === "done";
            });
            var notDoneArray = this.todo.filter(function (item) {
                return item.status !== "done";
            });

            sortedArray = [...notDoneArray, ...doneArray];
            return sortedArray;
        },
    },
    mounted() {
        axios
    }
});
