import { defineStore } from 'pinia'
import {ref} from "vue";
export const useExercisesStore = defineStore('exercises', () => {
    
    const exercises = ref([
        {
            "name": "Dumbbell bench press",
            "muscle": ["chest", "triceps"],
            "equipment": ["Bench", "Dumbbells"]
        },
        {
            "name": "Incline dumbbell bench press",
            "muscle": ["chest", "triceps"],
            "equipment": ["Bench", "Dumbbells"]
        },
        {
            "name": "Cable flyes",
            "muscle": ["chest"],
            "equipment": ["Cable"]
        },
        {
            "name": "Chest dips",
            "muscle": ["chest", "triceps"],
            "equipment": ["Dip bars"]
        },
        {
            "name": "Lat pulldown",
            "muscle": ["back", "biceps"],
            "equipment": ["Lat pulldown machine"]
        },
        {
            "name": "Pull-up",
            "muscle": ["back", "biceps"],
            "equipment": ["body weight"]
        },
        {
            "name": "Rowing",
            "muscle": ["back", "biceps"],
            "equipment": ["Row machine"]
        },
        {
            "name": "Shrugs",
            "muscle": ["back"],
            "equipment": ["Dumbbells"]
        },
        {
            "name": "Incline Dumbbell curls",
            "muscle": ["biceps"],
            "equipment": ["Dumbbells"]
        },
        {
            "name": "Straight bar curls",
            "muscle": ["biceps"],
            "equipment": ["Straight bar"]
        },
        {
            "name": "Hammer curls",
            "muscle": ["Forearms", "biceps"],
            "equipment": ["Dumbbells"]
        },
        {
            "name": "Military press",
            "muscle": ["shoulders", "triceps"],
            "equipment": ["Bench", "Dumbbells"]
        },
        {
            "name": "Cable lateral raises",
            "muscle": ["shoulders"],
            "equipment": ["Cable"]
        },
        {
            "name": "Reverse flyes",
            "muscle": ["shoulders", "back"],
            "equipment": ["Cable"]
        },
        {
            "name": "Cable push-down",
            "muscle": ["triceps"],
            "equipment": ["Cable"]
        },
        {
            "name": "Cable triceps extension",
            "muscle": ["triceps"],
            "equipment": ["Cable"]
        },
        {
            "name": "Dips",
            "muscle": ["triceps", "chest"],
            "equipment": ["Dip bars"]
        },
        {
            "name": "Squats",
            "muscle": ["Legs"],
            "equipment": ["Squat rack", "Straight bar"]
        },
        {
            "name": "Leg press",
            "muscle": ["Legs"],
            "equipment": ["Leg press machine"]
        },
        {
            "name": "Leg extension",
            "muscle": ["Legs"],
            "equipment": ["Leg extension machine"]
        },
        {
            "name": "Leg curls",
            "muscle": ["Legs"],
            "equipment": ["Leg curl machine"]
        },
        {
            "name": "Calf raises",
            "muscle": ["Legs"],
            "equipment": ["Calf raise machine"]
        }
    ])

    function addExercise(newExercise) {
        exercises.value.push(newExercise);
    }

    function removeExercise(index) {
        exercises.value.splice(index, 1);
        
    }

    function updateExercise(updatedExercise, index) {
        exercises.value[index] = updatedExercise;
    }
    
    function updateAll(allExercises) {
        exercises.value = allExercises;
    }
    
    return {
        exercises,
        addExercise,
        updateExercise,
        removeExercise,
        updateAll,
        
    }
})