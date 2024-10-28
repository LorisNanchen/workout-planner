<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Exercises</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Exercises</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExercisesComponent></ExercisesComponent>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExercisesComponent from "@/components/ExercisesComponent.vue";
</script>
