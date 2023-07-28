import { defineComponent, ref } from "vue";
// import { resolve } from "path"; // 此处如果报错则安装 node/path依赖
import TaskList from "../components/TaskList.vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    return () => (
      <div>
        <h2>Count: {count.value}</h2>
        <button onClick={() => count.value++}>Increment</button>
        <TaskList />
      </div>
    );
  },
});
