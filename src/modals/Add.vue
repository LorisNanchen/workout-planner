<script setup lang="ts">

import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonTitle, IonToolbar, IonDatetime, IonSelectOption, IonSelect} 
from "@ionic/vue";
import {ref} from "vue";
import { modalController } from '@ionic/vue';
import { useProgramStore } from '@/stores/program'
import { useExercisesStore } from '@/stores/exercises'

const props = defineProps<{
    date: string,
}>();
const ProgramStore = useProgramStore()
const ExerciseStore = useExercisesStore()

const newDate = ref(props.date);
const newExerciseName = ref(ExerciseStore.exercises[0].name);
const newSets = ref([{}]);

const modal = ref();
const cancel = () => modalController.dismiss();
const confirm = async() => {
    const newProgram = {
        date: newDate.value,
        exerciseName: newExerciseName.value, // Split by comma and trim spaces
        sets: newSets.value, // Split by comma and trim spaces
    };
    ProgramStore.addProgram(newProgram)
    //
    await modalController.dismiss()
    console.log(newProgram)
};
</script>

<template>
    
    <ion-content ref="modal" trigger="open-modal" id="add-modal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Add</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm">Confirm</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" id="add-content">
            <ion-datetime :value="newDate" v-model="newDate" presentation="date"></ion-datetime><br>
            <ion-select fill="solid" justify="start" label="Choose Exercise:" placeholder="Exercise" v-model="newExerciseName" interface="popover">
                <ion-select-option v-for="exercise in ExerciseStore.exercises" :value="exercise.name">{{exercise.name}}</ion-select-option>
            </ion-select><br>
            <div class="card" v-for="(set, index) in newSets">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>Set {{index +1}}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class="set-content" style="color: inherit">
                        <ion-input v-model="newSets[index].reps" fill="outline" placeholder="reps" />
                        <ion-input v-model="newSets[index].weight" fill="outline" placeholder="weight" />
                        <ion-buttons>
                            <ion-button @click="newSets.splice(index, 1)">Remove</ion-button>
                        </ion-buttons>
                    </ion-card-content>
                </ion-card>
            </div>
            <div class="add-button">
                <ion-button @click="newSets.push({})">Add Set</ion-button>
            </div>
        </ion-content>
    </ion-content>
</template>

<style scoped>
#add-modal {
    --overflow: hidden; /* Prevent modal scrollbar */
}

#add-content {
    max-height: 90%; /* Limit the height of the content */
    overflow-y: auto; /* Enable vertical scrolling */
}

#add-content::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
}
.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
}
.set-content > * {
    margin: 5px;
}

</style>