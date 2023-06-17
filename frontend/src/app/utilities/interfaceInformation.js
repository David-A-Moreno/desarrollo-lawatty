export const INFORMATION = [
    { //0
        title: "¿Qué quieres hacer?",
        buttons: [
            {
                optionTitle: "Sesión de estudio o trabajo",
                nextInterface: 1
            },
            {
                optionTitle: "Ver estadísticas",
                nextInterface: '/statistics'
            },
        ],
        goBackButton: false,
        lastInteface: 0
    }, 
    { //1
        title: "Seleccione el tipo de sesión",
        buttons: [
            {
                optionTitle: "Estudio o investigación",
                nextInterface: 2
            },
            {
                optionTitle: "Trabajo o tarea",
                nextInterface: 3
            },
        ],
        goBackButton: true,
        lastInteface: 0
    }, 
    { //2
        title: "¿Qué tanto interés tienes en el tema?",
        buttons: [
            {
                optionTitle: "Alto",
                nextInterface: '/SetTime'
            },
            {
                optionTitle: "Intermedio o bajo",
                nextInterface: '/SetTime'
            },
        ],
        goBackButton: true,
        lastInteface: 1
    }, 
    { //3
        title: "Seleccione la dificultad de la tarea",
        buttons: [
            {
                optionTitle: "Alto o intermedio",
                nextInterface: '/SetTime'
            },
            {
                optionTitle: "Bajo",
                nextInterface: '/SetTime'
            },
        ],
        goBackButton: true,
        lastInteface: 1
    },
]