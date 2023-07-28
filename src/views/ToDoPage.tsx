import { defineComponent, ref } from "vue";
// import { resolve } from "path"; // 此处如果报错则安装 node/path依赖
import TaskList from "../components/TaskList";

export default defineComponent({
  setup() {
    const count = ref(0);

    return () => (
      <div class="flex min-h-screen w-full">
        <div class="flex bg-orange-300 border-2 border-black	 	">
          {/*  */}
          OptionList
        </div>
        <div class="justify-center items-center flex-auto bg-teal-400 ">
          <span class="text-center"><h1>Task</h1></span>
          <TaskList />
        </div>
      </div>
    );
  },
});
