import { defineStore } from 'pinia'
import {ref} from "vue";
export const useProgramStore = defineStore('program', () => {

    const program = ref([
        {
            "date": '2024-10-14',
            "exerciseName": "Cable flyes",
            "sets": [
                {
                    "reps": "12",
                    "weight": "34",
                },
                {
                    "reps": "10",
                    "weight": "34",
                },
                {
                    "reps": "10",
                    "weight": "30",
                }
            ]
        },
    ])

    function addProgram(newProgram) {
        program.value.push(newProgram);
    }

    function removeProgram(index) {
        program.value.splice(index, 1);

    }

    function updateProgram(updatedProgram, index) {
        program.value[index] = updatedProgram;
    }

    function updateAll(allProgram) {
        program.value = allProgram;
    }

    return {
        program,
        addProgram,
        updateProgram,
        removeProgram,
        updateAll,

    }
})