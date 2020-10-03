import { ObservableList }           from "../observable/observable.js";
import { Attribute, VALID, VALUE }  from "../presentationModel/presentationModel.js";
import { todoItemProjector }        from "./todoProjector.js";
import { Scheduler }                from "../dataflow/dataflow.js";
import { fortuneService }           from "./fortuneService.js";

export { TodoController, TodoItemsView, TodoTotalView, TodoOpenView}

/**
 *
 * @returns {object} API of TodoController
 * @constructor
 */
const TodoController = () => {

    /**
     * Internal To-Do class. Single class representation of the model observed in this project
     * @inner Class is not exposed in the API
     * @class Class represents a single To-Do
     * @typedef {Object} To-Do
     * @returns {object} API of the To-Do class
     * @constructor
     */
    const Todo = () => {                               // facade
        const textAttr = Attribute("text");
        const doneAttr = Attribute(false);

        textAttr.setConverter( input => input.toUpperCase() );
        textAttr.setValidator( input => input.length >= 3   );

        // business rules / constraints (the text is only editable if not done)
        doneAttr.getObs(VALUE).onChange( isDone => textAttr.getObs("EDITABLE",!isDone).setValue(!isDone));

        return {
            getDone:            doneAttr.getObs(VALUE).getValue,
            setDone:            doneAttr.getObs(VALUE).setValue,
            onDoneChanged:      doneAttr.getObs(VALUE).onChange,
            getText:            textAttr.getObs(VALUE).getValue,
            setText:            textAttr.setConvertedValue,
            onTextChanged:      textAttr.getObs(VALUE).onChange,
            onTextValidChanged: textAttr.getObs(VALID).onChange,
            onTextEditableChanged: textAttr.getObs("EDITABLE").onChange,
        }
    };


    /**
     * To-Do model consists of multiple To-Do's
     * @type {Observable[]} list of items that implement the Observable interface
     */
    const todoModel = ObservableList([]); // observable array of Todos, this state is private
    const scheduler = Scheduler();

    /**
     * Creates a blank To-Do
     * @see To-Do for more information
     * @returns {To-Do} a new blank To-Do object
     */
    const addTodo = () => {
        const newTodo = Todo();
        todoModel.add(newTodo);
        return newTodo;
    };

    /**
     * Adds a new To-Do and assigns a random To-Do objective
     */
    const addFortuneTodo = () => {
        const newTodo = Todo();
        todoModel.add(newTodo);
        newTodo.setText('...');
        scheduler.add( ok =>
           fortuneService( text => {
                   newTodo.setText(text);
                   ok();
               }
           )
        );
    };

    return {
        numberOfTodos:      todoModel.count,
        numberOfopenTasks:  () => todoModel.countIf( todo => ! todo.getDone() ),
        addTodo:            addTodo,
        addFortuneTodo:     addFortuneTodo,
        removeTodo:         todoModel.del,
        onTodoAdd:          todoModel.onAdd,
        onTodoRemove:       todoModel.onDel,
        removeTodoRemoveListener: todoModel.removeDeleteListener, // only for the test case, not used below
    }
};


// View-specific parts
/**
 * View returns all To-Do's
 * @param todoController Controller for this view
 * @param {HTMLElement} rootElement the root element where the view should be placed
 * @see {To-Do} for more information
 * @constructor
 */
const TodoItemsView = (todoController, rootElement) => {

    /**
     * Render function for the view
     * @param {To-Do} todo renders a To-Do
     */
    const render = todo =>
        todoItemProjector(todoController, rootElement, todo);

    // binding
    todoController.onTodoAdd(render);

    // we do not expose anything as the view is totally passive.
};

/**
 * View to display the current To-Do count
 * @param todoController Controller for this view
 * @param {number} numberOfTasksElement current number of all To-Do's
 * @see {To-Do} for more information
 * @constructor
 */
const TodoTotalView = (todoController, numberOfTasksElement) => {

    const render = () =>
        numberOfTasksElement.innerText = "" + todoController.numberOfTodos();

    // binding

    todoController.onTodoAdd(render);
    todoController.onTodoRemove(render);
};

/**
 * View to display the current To-Do count of all open To-Do's
 * @param todoController Controller for this view
 * @param {number} numberOfOpenTasksElement current number of all open To-Do's
 * @see {To-Do} for more information
 * @constructor
 */
const TodoOpenView = (todoController, numberOfOpenTasksElement) => {

    const render = () =>
        numberOfOpenTasksElement.innerText = "" + todoController.numberOfopenTasks();

    // binding

    todoController.onTodoAdd(todo => {
        render();
        todo.onDoneChanged(render);
    });
    todoController.onTodoRemove(render);
};
