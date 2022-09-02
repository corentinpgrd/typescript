"use strict";
// querySelector recuperation des éléments
const btnSubmit = document.querySelector(".todo-btn");
const inputTask = document.querySelector(".todo-input");
;
const formTask = document.querySelector(".todo-form");
const taskList = document.querySelector(".todo-list");
const btnDeleteAll = document.querySelector(".todo-delete-all");
//On crée un tableau pour stocker toutes nos nouvelles tâches
const tasks = JSON.parse(localStorage.getItem("task") || "[]");
// Fonction qui sauvegarde les éléments dans le localstorage
const saveTasks = () => {
    localStorage.setItem("task", JSON.stringify(tasks));
};
// Ajouter les nouvelles tâches au démarrage du DOM
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => appendTask(task));
});
const handleSubmit = (e) => {
    e.preventDefault(); //évite de refresh la page
    // Création d'un nouvel objet Task
    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    };
    // Sauvegarder la tâche dans le localStorage
    tasks.push(newTask);
    //ajout de la fonction appendTask
    appendTask(newTask);
    // Sauvegarder l'envoi des tâches dans le localStorage
    saveTasks();
    //vider l'input
    inputTask.value = "";
};
// ON va gérer l'eventListener sur le form
formTask.addEventListener("submit", e => handleSubmit(e));
// Fonction d'ajout d'une nouvelle tâche
const appendTask = (newTask) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement("input");
    const btnDel = document.createElement("button");
    btnDel.classList.add("deleteBtn");
    checkB.type = "checkbox"; // ajouter le type à l'input
    checkB.checked = newTask.completed;
    console.log(newTask.completed);
    if (newTask.completed === true) {
        newLi.style.textDecoration = "line-through";
    }
    else {
        newLi.style.textDecoration = "none";
    }
    checkB.addEventListener("change", () => {
        console.log("vérification");
        newTask.completed = checkB.checked;
        if (newTask.completed === true) {
            newLi.style.textDecoration = "line-through";
        }
        else {
            newLi.style.textDecoration = "none";
        }
        console.log(newTask.completed);
        saveTasks();
    });
    newLi.append(checkB, newTask.task, btnDel);
    taskList.prepend(newLi);
    btnDel.addEventListener("click", () => {
        newLi.remove();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task === newTask.task) {
                tasks.splice(i, 1);
            }
        }
        saveTasks();
    });
};
// Bouton Tout effacer 
const clearTasks = () => {
    const confirmDel = confirm("êtes vous sûr de vouloir tout supprimer ?");
    if (confirmDel === true) {
        localStorage.removeItem("task");
    }
};
btnDeleteAll.addEventListener("click", clearTasks);
