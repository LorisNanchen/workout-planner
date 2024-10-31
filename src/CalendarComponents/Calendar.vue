
<script setup>
import {IonButtons, IonButton, IonLabel, IonIcon, IonTabButton} from '@ionic/vue';
import { ref } from 'vue';
import {addWeeks, addDays, subWeeks, subDays, startOfWeek, getWeek, format} from 'date-fns';
import {caretBack, caretForward, calendarNumberOutline, calendarOutline} from 'ionicons/icons';
import WeekView from './WeekView.vue';
import DayView from './DayView.vue';

const currentView = ref('week');
const currentDate = ref(new Date());
const startDate = ref(startOfWeek(new Date(), { weekStartsOn: 1 }));

const changeView = (view) => {
    currentView.value = view;
};

const formatDate = (date) => format(date, "yyyy-MM-dd")

const next = () => {
    if (currentView.value === 'week') {
        startDate.value = addWeeks(startDate.value, 1);
    } else {
        currentDate.value = addDays(currentDate.value, 1);
    }
};

const prev = () => {
    if (currentView.value === 'week') {
        startDate.value = subWeeks(startDate.value, 1);
    } else {
        currentDate.value = subDays(currentDate.value, 1);
    }
};
</script>

<template>
    <div>
        <ion-buttons class="header">
            <div class="view-buttons">
                <ion-button @click="changeView('week')">
                    <div class="view-button">
                        <ion-icon aria-hidden="true" :icon="calendarOutline" id="view-icon" />
                        <ion-label>Week View</ion-label>
                    </div>
                </ion-button>
                <ion-button @click="changeView('day')">
                    <div class="view-button">
                        <ion-icon aria-hidden="true" :icon="calendarNumberOutline" id="view-icon" />
                        <ion-label>Day View</ion-label>
                    </div>
                </ion-button>
            </div>
            <div class="nav-buttons">
                <ion-button @click="prev"><ion-icon :icon="caretBack" /></ion-button>
                <div v-if="currentView === 'week'">
                    <ion-label>Week {{getWeek(startDate)}}</ion-label>
                </div>
                <div v-if="currentView === 'day'">
                    <ion-label>{{formatDate(currentDate)}}</ion-label>
                </div>
                
                <ion-button @click="next"><ion-icon :icon="caretForward" /></ion-button>
            </div>
        </ion-buttons>
        <div v-if="currentView === 'week'">
            <WeekView :startDate="startDate" />
        </div>
        <div v-if="currentView === 'day'">
            <DayView :currentDate="currentDate" />
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
.nav-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.view-buttons {
    display: flex;
    flex-direction: row;
}
.view-button {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#view-icon {
    padding-bottom: 5px;
}

ion-icon {
    height: 20px;
    width: 20px;
}

ion-buttons {
    padding: 20px;
}
</style>