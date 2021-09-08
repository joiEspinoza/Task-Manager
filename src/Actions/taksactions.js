import { types } from "../Type/types";

//////<<<<<------------------------------------------------``


const loadNewTask = ( tasks ) => ( { type : types.load, payload : tasks } );

const setActiveEdit = ( bool ) => ( { type : types.activeEdit, payload : bool } );

const setActiveTask = ( activeTask ) => ( { type : types.activeTask, payload : activeTask } );


//////---------------------------------------------->>>>>

export { loadNewTask, setActiveEdit, setActiveTask };