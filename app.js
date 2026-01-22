class Tarea {
    constructor(texto) {
        this.texto = texto;
        this.completada = false;
        this.editar = false;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
        this.lista = document.getElementById("ListaDeTareas");
    }

    agregarTarea(texto) {
        this.tareas.push(new Tarea(texto));
        this.render();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.render();
    }

    editarTarea(index) {
        this.tareas[index].editar = true;
        this.render();
    }
    
    guardarTarea(index, nuevoTexto) {
    if (!nuevoTexto.trim()) return;

    this.tareas[index].texto = nuevoTexto.trim();
    this.tareas[index].editando = false;
    this.render();
    }

    render() {
        this.lista.innerHTML = "";

        this.tareas.forEach((tarea, index) => {
            const li = document.createElement("li");
            li.textContent = tarea.texto;

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.addEventListener("click", () => {
                const nuevoTexto = prompt("Editar tarea:", tarea.texto);
                if (nuevoTexto !== null) { 
                    this.guardarTarea(index, nuevoTexto);
                } 
            });

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => {
                this.eliminarTarea(index);
            });

            li.appendChild(btnEliminar);
            li.appendChild(btnEditar);
            this.lista.appendChild(li);
        });
    }
}

const gestor = new GestorTareas();
const form = document.getElementById("tareasFormulario");
const input = document.getElementById("tarea");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = input.value.trim();
    if (!texto) return;

    gestor.agregarTarea(texto);
    input.value = "";
});
