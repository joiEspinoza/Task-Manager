import { types } from "../Type/types";

//////<<<<<------------------------------------------------``


const loadNewTask = ( tasks ) => ( { type : types.load, payload : tasks } );

const setActive = ( taskId ) => ( { type : types.active, payload : taskId } );

const setActiveTask = ( activeTask ) => ( { type : types.activeTask, payload : activeTask } );


//////---------------------------------------------->>>>>

export { loadNewTask, setActive, setActiveTask };