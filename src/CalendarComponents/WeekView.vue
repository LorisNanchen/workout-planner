
<script setup>
import {IonAccordion, IonAccordionGroup, IonItem, IonButton, modalController, IonCard, IonCardContent, IonCardTitle} from "@ionic/vue";
import { ref, watch } from 'vue';
import { addDays, format } from 'date-fns';
import { toRefs } from 'vue';
import { useProgramStore } from '@/stores/program.js'
import Add from "@/modals/Add.vue";
import ShowExercise from "@/components/ShowExercises.vue";

const props = defineProps({
startDate: {
type: Date,
required: true,
},
});

const { startDate } = toRefs(props);
const days = ref([]);

const generateWeek = () => {
    days.value = Array.from({ length: 7 }, (_, i) => addDays(startDate.value, i));
};

const openModal = async(date) => {
    const modal = await modalController.create({
        component: Add,
        componentProps: { date: date},
    });
    await modal.present();

}

watch(startDate, generateWeek, { immediate: true });

const formatDate = (date) => format(date, "yyyy-MM-dd");
</script>

<template>
    <ion-accordion-group class="week">
        <ion-accordion v-for="day in days" :key="day" class="day">
            <ion-item slot="header" color="light">{{ formatDate(day) }}</ion-item>
            <div slot="content">
                <ShowExercise :date="formatDate(day)" />
                <div class="add-button">
                    <ion-button  @click="openModal(formatDate(day))" class="ion-padding">Add Exercise</ion-button>
                </div>
            </div>
        </ion-accordion>
    </ion-accordion-group>
</template>

<style scoped>
.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
