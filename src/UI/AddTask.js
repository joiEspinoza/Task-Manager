import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { loadNewTask } from '../Actions/taksactions';
import { useForm } from '../Hook/useForm';

//////<<<<<------------------------------------------------``


const AddTask = ( { currentTasks } ) => 
{

    const dispatch = useDispatch();

    
    //Rescate info Inputs
    const initFormValues = 
    { 
        taskTitle : "", 
        taskDesc : ""  
    };
    const [ formValues, handleInputChange, reset ] = useForm( initFormValues );
    const { taskTitle, taskDesc } = formValues;
    
    
    //Creación nueva tarea
    const handleNewTask = (e) =>
    {
        
        e.preventDefault();

        //Validacion entradas
        if( !taskTitle.trim() || !taskDesc.trim() )
        {
            alert( "Titulo y descripcion de la tarea son obligatorios" );
            return;
        };


        const currentDate = moment().format( 'DD-MM-YYYY' );
        currentTasks.push({ 

            //Si id no existe resetea a 1
            id: currentTasks[currentTasks.length - 1] ? currentTasks[currentTasks.length - 1].id+1 : 1, 
            title : taskTitle, 
            description : taskDesc, 
            date : currentDate
            
        })

        dispatch( loadNewTask( currentTasks ) )
        
        reset();

    };


///////////////////////////************************************************////////////////////////


    return (
        
            
        <form onSubmit={ handleNewTask }>

            <div className="form-group">
                <input className="form-control" name="taskTitle" placeholder="Titulo de la tarea" value={ taskTitle } onChange={ handleInputChange }/>
            </div>

            <div className="form-group mt-4">
                <input className="form-control"  name="taskDesc" placeholder="Descripción" value={ taskDesc } onChange={ handleInputChange }/>
            </div>

            <div className="form-group mt-4">
                <button id="newtask" className="form-control btn btn-primary">Crear Tarea</button>
            </div>

        </form>
    
    )
}


//////---------------------------------------------->>>>>

export default AddTask;
