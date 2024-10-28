<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useExercisesStore } from '@/stores/exercises.js'
import { useProgramStore } from '@/stores/program.js'
import {watch} from "vue";

const ExercisesStore = useExercisesStore()
const ProgramStore = useProgramStore()

if (!JSON.parse(localStorage.getItem("Exercises"))) {
    localStorage.setItem("Exercises", JSON.stringify(ExercisesStore.exercises))
} else {
    ExercisesStore.updateAll(JSON.parse(localStorage.getItem("Exercises")))
}

if (!JSON.parse(localStorage.getItem("Program"))) {
    localStorage.setItem("Program", JSON.stringify(ProgramStore.program))
} else {
    ProgramStore.updateAll(JSON.parse(localStorage.getItem("Program")))
}

watch(ExercisesStore.exercises, async (newValue, oldValue) => {
    localStorage.setItem("Exercises", JSON.stringify(ExercisesStore.exercises))
});

watch(ProgramStore.program, async (newValue, oldValue) => {
    localStorage.setItem("Program", JSON.stringify(ProgramStore.program))
});

</script>

<style>
ion-button{
    color: inherit;
}
</style>