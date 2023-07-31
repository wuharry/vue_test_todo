import { Ref } from "vue";

export interface ITask {
    taskName: Ref<string>;
    deadline: Ref<string|null>;
    priority: Ref<string|null>;
    id: number;
}