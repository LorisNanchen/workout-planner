<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButtons, IonButton, IonAlert, IonSearchbar, IonSelect, IonSelectOption, IonIcon } from '@ionic/vue';
import {computed, onMounted, ref} from "vue";
import Create from "@/modals/Create.vue";
import Update from "@/modals/Update.vue";
import { modalController } from '@ionic/vue';
import { useExercisesStore } from '@/stores/exercises'
import {add, arrowForwardCircleOutline, arrowForwardOutline} from 'ionicons/icons';
import Details from "@/modals/Details.vue";

const searchQuery = ref('');
const filterQuery = ref('');
const exercises = ref([''])
const ExercisesStore = useExercisesStore()

const filteredByName = computed(() => {
    if (exercises.value[0] != '') {
        return exercises.value.filter(item => {
            const nameMatches = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            const muscleMatches = filterQuery.value === '' || item.muscle.some(muscle =>
                filterQuery.value.includes(muscle.toLowerCase())
            );
            return nameMatches && muscleMatches;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }
});

const openModal = async(item) => {
    const modal = await modalController.create({
        component: Update,
        componentProps: { exercise: item, getExercises: getExercises }, // Pass a copy of the item to the modal
    });
    await modal.present();
        
}

const openDetails = async(name) => {
    const modal = await modalController.create({
        component: Details,
        componentProps: { name: name}, // Pass a copy of the item to the modal
    });
    await modal.present();

}

const getExercises = () => {
    exercises.value = ExercisesStore.exercises;
}

const deleteExercise = (id) => {
    ExercisesStore.removeExercise(id)
    getExercises()
}

onMounted(() => {
    getExercises()
});

</script>

<template>
    <div class="Exercises">
        <div class="buttons">
            <ion-button id="open-modal" expand="block" shape="round"><ion-icon slot="icon-only" :icon="add"></ion-icon></ion-button>
        </div>
        <Create :getExercises="getExercises" />
        <ion-searchbar placeholder="Search by name" v-model="searchQuery"></ion-searchbar>
        <ion-select justify="start" label="Filter by:" placeholder="Muscle" v-model="filterQuery" interface="popover">
            <ion-select-option value=""></ion-select-option>
            <ion-select-option value="chest">Chest</ion-select-option>
            <ion-select-option value="triceps">Triceps</ion-select-option>
            <ion-select-option value="biceps">Biceps</ion-select-option>
            <ion-select-option value="back">Back</ion-select-option>
            <ion-select-option value="legs">Legs</ion-select-option>
            <ion-select-option value="forearms">Forearms</ion-select-option>
            <ion-select-option value="shoulders">Shoulders</ion-select-option>
        </ion-select>
        <div class="card" v-for="exercise in filteredByName">

            <ion-card>
                <ion-card-header>
                    <ion-card-title id="card-title">{{ exercise.name }} &nbsp; <ion-icon @click="openDetails(exercise.name)" :icon="arrowForwardCircleOutline"></ion-icon></ion-card-title>
                    <div>
                        <ion-card-subtitle v-for="muscle in exercise.muscle">{{ muscle }}</ion-card-subtitle>
                    </div>
                </ion-card-header>
                <ion-card-content>
                    <strong>Material:</strong>
                    <div v-for="equipment in exercise.equipment">{{ equipment }}</div>
                    <ion-buttons>
                        <ion-button @click="openModal(exercise)">Update</ion-button>
                        <ion-button :id="exercise.name + '-delete'">Delete</ion-button>
                    </ion-buttons>
                    <ion-alert :trigger="exercise.name + '-delete'" :header="exercise.name" sub-header="Are you sure you want to delete this Exercice?" :buttons="[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Confirm',
                            role: 'confirm',
                            handler: () => {
                                deleteExercise(exercises.indexOf(exercise))
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

.buttons {
    width: 90vw;
    max-width: 25em;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}

#card-title {
    display: flex;
    align-items: center;
}

ion-searchbar {
    width: 95vw;
    max-width: 25em;
}

ion-select {
    padding: 5px 16px;
    width: 95vw;
    max-width: 25em;
}

.card {
    width: 95vw;
    max-width: 25em;
}

.Exercises {
    margin-top: 1em;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.arrow-button {
    background-color: inherit;
    padding: 0.5em;
}
</style>