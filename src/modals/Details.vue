<script setup lang="ts">

import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonLabel, IonCardSubtitle} from "@ionic/vue";
import {ref, computed} from "vue";
import { modalController } from '@ionic/vue';
import { useProgramStore} from '@/stores/program'

const props = defineProps<{
    name: string;
}>();

const ProgramStore = useProgramStore()

const matchingProgram = computed(() =>
    ProgramStore.program
        .filter(program => program.exerciseName === props.name)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
);

const modal = ref();
const cancel = () => modalController.dismiss();
</script>

<template>
    <ion-content ref="modal" id="add-modal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel">Back</ion-button>
                </ion-buttons>
                <ion-title>History</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" id="add-content" v-if="matchingProgram.length == 0">No matching program found for {{props.name}}.</ion-content>
        <ion-content class="ion-padding" id="add-content" v-else>
            <ion-card class="card" v-for="(program, index) in matchingProgram">
                <div v-if="program.exerciseName === props.name">
                    <ion-card-header>
                        <ion-card-title>{{program.exerciseName}}</ion-card-title>
                        <ion-card-subtitle>{{program.date}}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item v-for="(set, index) in program.sets">
                                <ion-badge slot="start">{{index+1}}</ion-badge>
                                <div class="set-details">
                                    <ion-label>Reps : {{set.reps}}</ion-label>
                                    <ion-label>Weight : {{set.weight}}</ion-label>
                                </div>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </div>
            </ion-card>

        </ion-content>
    </ion-content>
</template>

<style scoped>
.set-details {
    display: flex;
    flex-direction: row;
}

#add-modal {
    --overflow: hidden;
}

#add-content {
    max-height: 90%;
    overflow-y: auto
}

#add-content::-webkit-scrollbar {
    display: none;
}
ion-badge {
    --color: white;
    --padding-end: 10px;
    --padding-start: 10px;
}
ion-item {
    display: flex;
    align-items: center;
}
</style>