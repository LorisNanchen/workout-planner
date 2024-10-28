<script setup lang="ts">

import {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonList,
    IonItem,
    IonBadge,
    IonInput,
    IonButton,
    IonAlert,
    IonButtons,
    IonLabel,
    modalController, IonIcon
} from "@ionic/vue";
import { useProgramStore } from '@/stores/program'
import {format} from "date-fns";
import {computed} from "vue";
import Details from "@/modals/Details.vue";
import {arrowForwardCircleOutline} from "ionicons/icons";

const props = defineProps({
    date: String
});

const ProgramStore = useProgramStore();

const formatDate = (date) => format(date, "yyyy-MM-dd");

const updateSet = (program, index) => {
    ProgramStore.updateProgram(program, index);
}

const matchingProgram = computed(() =>
    ProgramStore.program.some(program => program.date === formatDate(props.date))
);

const openDetails = async(name) => {
    const modal = await modalController.create({
        component: Details,
        componentProps: { name: name}, // Pass a copy of the item to the modal
    });
    await modal.present();

}
</script>

<template>
    <div id="show-cards">
        <ion-label class="ion-padding" id="add-content" v-if="!matchingProgram">No matching exercises found.</ion-label>
        <div class="card" v-for="(program, index) in ProgramStore.program" v-else>
            <ion-card v-if="program.date === formatDate(props.date)">
                <ion-card-header>
                    <ion-card-title id="card-title">{{program.exerciseName}}  &nbsp; <ion-icon @click="openDetails(program.exerciseName)" :icon="arrowForwardCircleOutline"></ion-icon></ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="(set, index) in program.sets">
                            <ion-badge slot="start" @click="program.sets.splice(index, 1)">{{index+1}}</ion-badge>
                            <div class="set-details">
                                <ion-input fill="solid" label="Reps" label-placement="floating" v-model="set.reps"></ion-input>
                                <ion-input fill="solid" label="Weight" label-placement="floating" v-model="set.weight"></ion-input>
                            </div>
                        </ion-item>
                    </ion-list>
                    <ion-buttons>
                        <ion-button @click="program.sets.push({})">Add</ion-button>
                        <ion-button :id="index">Delete</ion-button>
                    </ion-buttons>
                    <ion-alert :trigger="index" :header="program.exerciseName" sub-header="Are you sure you want to delete this Exercice?" :buttons="[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Confirm',
                            role: 'confirm',
                            handler: () => {
                                ProgramStore.removeProgram(index)
                            }
                        }
                    ]">
                    </ion-alert>
                </ion-card-content>
            </ion-card>
        </div>
    </div>
</template>

<style scoped>
#show-cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
}
ion-badge {
    --color: white;
    --padding-end: 10px;
    --padding-start: 10px;
}

.set-details {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#card-title {
    display: flex;
    align-items: center;
}

</style>