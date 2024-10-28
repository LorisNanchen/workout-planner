<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

          <ion-tab-button tab="exercises" href="/exercises">
              <ion-icon aria-hidden="true" :icon="ellipse" />
              <ion-label>Exercises</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="program" href="/program">
              <ion-icon aria-hidden="true" :icon="ellipse" />
              <ion-label>Program</ion-label>
          </ion-tab-button>
          
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse } from 'ionicons/icons';
</script>
