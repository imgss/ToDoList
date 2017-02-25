import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    onlyUnfinish: false,
    todos: [{
            isImportant: 1,
            isFinished: false,
            timeStamp: 'a',
            value: '洗衣服',
            tips: '不洗完不睡觉',
            deadline: '14:00',
            show: true
        },
        {
            isImportant: 2,
            isFinished: false,
            timeStamp: '12:00',
            value: '做demo',
            tips: '',
            deadline: '16:00',
            show: true
        },
        {
            isImportant: 3,
            timeStamp: 'c',
            isFinished: false,
            value: '去拍照',
            tips: '',
            deadline: '18:00',
            show: true
        }
    ],
    diary: '# 标题'
}
let getters = {
    todos: state => state.todos,
    countTodos: state => state.todos.length,
    countFinishedItems: state => {
        let countFinished = 0;
        state.todos.forEach(function(item) { if (item.isFinished) countFinished++; })
        return countFinished;
    },
    md: state => state.diary
}
let actions = {
    autoSave: function(context, md) {
        context.commit(save_diary(md));
    }
}
let mutations = {
    additem(st, newit) {
        st.todos.push(newit);
    },
    removeItem(st, i) {
        st.todos.splice(i, 1);
    },
    listByProp(st, prop) {
        if (st.todosCopy) {
            st.todos = st.todosCopy;
        }
        st.todos.sort(function(self, next) {
            return next[prop] - self[prop];
        });
    },
    listByDeadline(st) { //按截止日期排序
        var todos = st.todos;
        st.todos.sort(function(self, next) {
            var numSelf = parseFloat(self.deadline.replace(/:/, '.'));
            var numNext = parseFloat(next.deadline.replace(/:/, '.'));
            return numNext - numSelf;
        });
    },
    onlyUnfinished(st) {
        st.onlyUnfinish = !st.onlyUnfinish; //状态切换
        if (st.onlyUnfinish) {
            st.todos.forEach(function(item) {
                if (item.isFinished) {
                    item.show = false;
                }
            });
        } else {
            st.todos.forEach(function(item) {
                item.show = true;
            });
        }
    },
    save_diary(st, str) {
        st.diary = str;
    }

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})