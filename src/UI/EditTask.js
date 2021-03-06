import React from 'react';
import { useForm } from '../Hook/useForm';
import { useDispatch } from 'react-redux';
import { loadNewTask, setActiveEdit, setActiveTask } from '../Actions/taksactions';


//////<<<<<------------------------------------------------``


const EditTask = ( { currentTasks, activeTask } ) => 
{
    
    const dispatch = useDispatch();


    const initFormValues = 
    { 
        actTaskTitle : activeTask.title,
        actTaskDesc : activeTask.description
    };
    const [ formValues, handleInputChange ] = useForm( initFormValues );
    const { actTaskTitle, actTaskDesc } = formValues;


    //Edición de tarea por id
    const handleEditTask = (e) =>
    {

        e.preventDefault();

        //Validacion entradas
        if( !actTaskTitle.trim() )
        {
            alert( "El titulo es obligatorio" )
            return;
        };


        if( !actTaskDesc.trim() )
        {
            alert( "La descripción es obligatoria" )
            return;
        };


        currentTasks.find( ( task ) => 
        {
            
            if( task.id === activeTask.id )
            {
                task.title = actTaskTitle;
                task.description = actTaskDesc;
            };

        })

        dispatch( loadNewTask( currentTasks ) )
        
        alert( "Actualizado con exito" );

        dispatch( setActiveEdit( false ) );

    };


    //Cierre panel edición
    const handleCancelEdit = () => 
    {
        dispatch( setActiveEdit( false ) ); 
        dispatch( setActiveTask( false ) );
    };
 

///////////////////////////************************************************////////////////////////
   

    return (
        
        <form onSubmit={ handleEditTask }>

            <div className="form-group">
                <input className="form-control" name="actTaskTitle" placeholder="Nuevo titulo" value={ actTaskTitle } onChange={ handleInputChange }/>
            </div>

            <div className="form-group mt-4">
                <input className="form-control" name="actTaskDesc" placeholder="Nueva Descripción" value={ actTaskDesc } onChange={ handleInputChange }/>
            </div>

            <div className="form-group mt-4">
                <button className="form-control btn btn-warning base__white">Editar tarea</button>
            </div>

            <div className="form-group mt-4">
                <button onClick={ handleCancelEdit } className="form-control btn btn-warning base__white">Cancelar</button>
            </div>

        </form>
    )
}


//////---------------------------------------------->>>>>

export default EditTask;
