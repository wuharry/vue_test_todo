import {
  defineComponent,
  ref,
  render,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  toRefs,
} from "vue";
import { ITask } from "../types/Task";

export default defineComponent({
  setup(props:ITask,context) {
    const  task = toRefs(props);
    return {
      task,
    };
  },
  render() {
    return (
      <>
        <div class="taskContain">
          <span>{this.task?.id}</span>
          {/* <span>{{task?.name}}</span>
    <div>{{ task?.deadline }}</div> */}
          <div>
            <button>Edit</button>
            <button>Delet</button>
          </div>
        </div>
      </>
    );
  },
});
