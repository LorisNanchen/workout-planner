<!-- src/components/DayView.vue -->

<script setup>
import { format } from 'date-fns';
import { toRefs } from 'vue';
import {IonButton, IonCard, IonCardContent, IonCardTitle, modalController} from "@ionic/vue";
import Add from "@/modals/Add.vue";
import { useProgramStore } from '@/stores/program.js'
import ShowExercise from "@/components/ShowExercises.vue";
const props = defineProps({
    currentDate: {
        type: Date,
        required: true,
    },
});
const { currentDate } = toRefs(props);

const formatDate = (date) => format(date, 'yyyy-MM-dd');

const openModal = async(date) => {
    const modal = await modalController.create({
        component: Add,
        componentProps: { date: date}, // Pass a copy of the item to the modal
    });
    await modal.present();

}

</script>

<template>
    <div class="day-view">
        <ShowExercise :date="formatDate(currentDate)" />
    </div>
    <div class="add-button">
        <ion-button  @click="openModal(formatDate(currentDate))" class="ion-padding" slot="content">Add Exercise</ion-button>
    </div>
</template>

<style scoped>
.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
