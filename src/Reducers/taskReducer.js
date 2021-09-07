import { types } from "../Type/types";

//////<<<<<------------------------------------------------``

const task = 
[
    { id: 1, title : "test1", description : "test N° 1", date : "01-09-2021" },
    { id: 2, title : "test2", description : "test N° 2", date : "01-09-2021" },
    { id: 3, title : "test3", description : "test N° 3", date : "05-09-2021" },
    { id: 4, title : "test4", description : "test N° 4", date : "06-09-2021" },
];


const initState =
{
    currentTasks : task,
    activeTask : { title : "", description : "" },
};


const taskReducer = ( state = initState, action ) =>
{

    switch ( action.type ) 
    {
        case types.load : return { ...state, currentTasks : action.payload };

        case types.activeTask : return { ...state, activeTask : action.payload };

        default: return state;  
    };

};

//////---------------------------------------------->>>>>


export { taskReducer };