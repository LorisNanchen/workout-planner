<script setup>
import { CircleProgressBar } from 'circle-progress.vue';
import { ref, watch } from "vue";
import { IonButton, IonInput, IonButtons, IonLabel } from '@ionic/vue';

const customTime = ref(0); // User-set starting time
const secondsRemaining = ref(0); // Countdown time used internally
const timerRunning = ref(false);
const timer = ref(null);

const reset = () => {
    clearInterval(timer.value);
    secondsRemaining.value = customTime.value; // Reset to the user-set time
    timerRunning.value = false;
};

// Start or resume the timer
const start = () => {
    if (customTime.value <= 0) {
        alert("Please enter a positive time!");
        return;
    }
    // Only initialize secondsRemaining if starting fresh or resuming from pause
    if (!timerRunning.value && secondsRemaining.value === 0) {
        secondsRemaining.value = customTime.value;
    }
    timerRunning.value = true;

    timer.value = setInterval(() => {
        if (secondsRemaining.value > 0) {
            secondsRemaining.value--;
        } else {
            reset();
            alert("Time's up! Get ready for the next set!"); // Replace with toast if needed
        }
    }, 1000);
};

// Stop the timer without resetting
const stop = () => {
    timerRunning.value = false;
    clearInterval(timer.value);
};

</script>

<template>
    <div class="RestComponent" style="display: flex; flex-direction: column">
        
        <CircleProgressBar
            stroke-width="7"
            color-filled="#4d8dff"
            color-unfilled="#4d8dff"
            size="200"
            :value="secondsRemaining"
            :max="customTime || 1"
            animation-duration="0s">
            <ion-label style="width: 50%">{{secondsRemaining}}s</ion-label>
            
        </CircleProgressBar>
        <ion-input
                   v-model.number="customTime"
                   label="Set timer"
                   type="number"
                   style="width: 50%"
                   :disabled="timerRunning"
                   placeholder="Enter time in seconds">
        </ion-input>

        <ion-buttons style="display: flex; flex-direction: row">
            <ion-button @click="start" :disabled="timerRunning">Start</ion-button>
            <ion-button @click="stop" :disabled="!timerRunning">Stop</ion-button>
            <ion-button @click="reset">Reset</ion-button>
        </ion-buttons>
    </div>
</template>

<style scoped>
.RestComponent {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
