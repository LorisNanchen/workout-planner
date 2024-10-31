<script setup lang="ts">

import {IonButton, IonButtons, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar, IonToast} from "@ionic/vue";
import {ref} from "vue";
import { useExercisesStore } from '@/stores/exercises'
import {warningOutline} from "ionicons/icons";

const props = defineProps<{
    getExercises: () => void;
}>();
const ExercisesStore = useExercisesStore()

const newName = ref('');
const newMuscles = ref(['']);
const newEquipment = ref(['']);
const modal = ref();
const isOpen = ref(false);

const setOpen = (state: boolean) => {
    isOpen.value = state;
};
const cancel = () => {
    modal.value.$el.dismiss(null, 'cancel');
    newName.value = '';
    newMuscles.value = [''];
    newEquipment.value = [''];
} 
const confirm = () => {
    if (newName.value != '' && newMuscles.value != [''] && newEquipment.value != [''] ) {
        const newExercise = {
            name: newName.value,
            muscle: newMuscles.value,
            equipment: newEquipment.value,
        };
        ExercisesStore.addExercise(newExercise)

        props.getExercises()
        
        newName.value = '';
        newMuscles.value = [''];
        newEquipment.value = [''];

        modal.value.$el.dismiss('confirm');
    } else {
        setOpen(true)
    }
};
</script>

<template>
    <ion-modal ref="modal" trigger="open-modal" id="add-modal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Create</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm">Confirm</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" id="add-content">
            <ion-input v-model="newName" label="Exercise Name" label-placement="floating" fill="outline" placeholder="Enter Name"></ion-input><br>

            <div class="input-elem" v-for="(muscle, index) in newMuscles" :key="index">
                <ion-input v-model="newMuscles[index]" fill="outline" placeholder="Muscle name" />
                <ion-button @click="newMuscles.splice(index, 1)">Remove</ion-button>
            </div>
            <ion-button :disabled="newMuscles.at(-1) ===''" @click="newMuscles.push('')">Add Muscle</ion-button><br><br>

            <div class="input-elem" v-for="(equipment, index) in newEquipment" :key="index">
                <ion-input v-model="newEquipment[index]" fill="outline" placeholder="Equipment name" />
                <ion-button @click="newEquipment.splice(index, 1)">Remove</ion-button>
            </div>
            <ion-button :disabled="newEquipment.at(-1) ===''" @click="newEquipment.push('')">Add Equipment</ion-button>
            
        </ion-content>
    </ion-modal>
    <ion-toast :is-open="isOpen" message="Values can not be null" :duration="5000" @didDismiss="setOpen(false)" class="custom-toast" :icon="warningOutline" ></ion-toast>
</template>

<style scoped>
.input-elem {
    display: flex;
    flex-direction: row;
}
#add-modal {
    --overflow: hidden;
}

#add-content {
    max-height: 90%;
    overflow-y: auto;
}

#add-content::-webkit-scrollbar {
    display: none;
}

ion-toast.custom-toast {
    --background: #ff7373;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #ffffff;
}

</style>