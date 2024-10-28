<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Program</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Program</ion-title>
        </ion-toolbar>
      </ion-header>

      <ProgramComponent></ProgramComponent>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ProgramComponent from "@/components/ProgramComponent.vue";
</script>
