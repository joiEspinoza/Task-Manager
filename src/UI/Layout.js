import React, { useEffect, useState } from 'react'
import { useForm } from '../Hook/useForm';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { loadNewTask, setActiveTask } from '../Actions/taksactions';

//////<<<<<------------------------------------------------``

const Layout = () => 
{

    const { currentTasks, activeTask } = useSelector( state => state.tasks );
    const [ edit, setEdit ] = useState( false );
    const dispatch = useDispatch();
    
    
    useEffect(() => 
    {
        
        dispatch( setActiveTask( { title : "", description : "" } ) );
    
    },[dispatch]);

 

    const initFormValues = 
    { 
        taskTitle : "", 
        taskDesc : "" ,
        actTaskTitle : "",
        actTaskDesc : ""
    };
    const [ formValues, handleInputChange, reset ] = useForm( initFormValues );
    const { taskTitle, taskDesc, actTaskTitle, actTaskDesc } = formValues;
    const handleNewTask = (e) =>
    {
        
        e.preventDefault();

        if( !taskTitle.trim() || !taskDesc.trim() )
        {
            alert( "Titulo y descripcion de la tarea son obligatorios" );
            return;
        };

        const currentDate = moment().format('DD-MM-YYYY');


        currentTasks.push({ 

            id: currentTasks[currentTasks.length - 1] ? currentTasks[currentTasks.length - 1].id+1 : 1, 
            title : taskTitle, 
            description : taskDesc, 
            date : currentDate
            
        })

        dispatch( loadNewTask( currentTasks ) )
        
        reset();

    };


    
    const handleActivateEdit = ( id ) =>
    {
        setEdit( true );
        const active = currentTasks.find( ( task ) => task.id === id );
        dispatch( setActiveTask( active ) );

    };


    const handleEditTask = (e) =>
    {

        e.preventDefault();
 
        if( !actTaskTitle || !actTaskDesc )
        {
            alert( "campos son obligatorios" )
            return;
        };


        currentTasks.find( ( task ) => 
        {
            
            if( task.id === activeTask.id )
            {
                if( !actTaskTitle.trim() || !actTaskDesc.trim() )
                {
                    return;
                };

                task.title = actTaskTitle;
                task.description = actTaskDesc;
            };

        })

        dispatch( loadNewTask( currentTasks ) )
        
        alert( "Actualizado con exito" );

        reset();

        setEdit( false );

    };


    const handleCancelEdit = () => 
    {
        setEdit( false );  
        dispatch( setActiveTask( false ) );
    };


    const handleDelete = ( id, title ) =>
    {
        

        let opcion = window.confirm(`¿Estas seguro de eliminar la tarea ${title}?`);
        if (opcion === true) 
        {
           
            const newTaks = currentTasks.filter( ( task ) => task.id !== id );
            dispatch( loadNewTask( newTaks ) );
            return;
           
        } 
        else 
        {
            return;
        };

    };


    const accionEnter = ( event ) =>
    {
        
        const newtask = document.getElementById( "newtask" );

        if( event.keyCode === 13 )
        {
            event.preventDefault();
            newtask.click();
        };
        
    };

    window.onkeydown = accionEnter;


///////////////////////////************************************************////////////////////////


    return (
        
        <div className="container">
        
            <div className="row p-5">
                
                <div className="col-md-12 col-12 base__flexCenter">

                    <div className="card p-3 layout__boxShadowCard" style={{ width : "100%"}}>
                        
                        <div className="card-body">
                            
                        {
                            !edit ?
                            <form onSubmit={ handleNewTask }>

                                <div className="form-group">
                                    <input className="form-control" name="taskTitle" placeholder="Title task" value={ taskTitle } onChange={ handleInputChange }/>
                                </div>

                                <div className="form-group mt-4">
                                    <input className="form-control"  name="taskDesc" placeholder="Description" value={ taskDesc } onChange={ handleInputChange }/>
                                </div>

                                <div className="form-group mt-4">
                                    <button id="newtask" className="form-control btn btn-primary">New Task</button>
                                </div>

                            </form>
                            
                            :
                            
                            <form onSubmit={ handleEditTask }>

                                <div className="form-group">
                                    <input className="form-control" name="actTaskTitle" placeholder="New Title task" value={ actTaskTitle } onChange={ handleInputChange }/>
                                </div>

                                <div className="form-group mt-4">
                                    <input className="form-control" name="actTaskDesc" placeholder="New Description" value={ actTaskDesc } onChange={ handleInputChange }/>
                                </div>

                                <div className="form-group mt-4">
                                    <button className="form-control btn btn-warning base__white">Edit Task</button>
                                </div>

                                <div className="form-group mt-4">
                                    <button onClick={ handleCancelEdit } className="form-control btn btn-warning base__white">Cancelar</button>
                                </div>

                            </form>
                        }

                        </div>
                    
                    </div>
                    
                </div>
            
            </div>

            <div className="row p-5">
                        
                <div className="col-md-12 col-12">
                    
                    <div className="card p-3 layout__boxShadowCard">
                        
                        <div className="card-body">
                            
                            <table className="table table-hover text-center">
                            
                                <thead>
                                    
                                    <tr>
                                        <th className="col">Id</th>
                                        <th className="col">Tarea</th>
                                        <th className="col">Descripción</th>
                                        <th className="col">Actualizar</th>
                                        <th className="col">Eliminar</th>
                                    </tr>
                                
                                </thead>
                                
                                <tbody>

                                    {
                                        currentTasks.map( ( task, index ) => 
                                        {
                                            return <tr key={index} className="animate__animated animate__fadeIn">
                                                    
                                                <th scope="row">{ task.id }</th>
                                                <td>{ task.title }</td>
                                                <td>{ task.description }</td>
                                                <td><button className="btn btn-warning base__white" onClick={ () => { handleActivateEdit( task.id ) } }><i className="fas fa-edit"></i></button></td>
                                                <td><button className="btn btn-danger" onClick={ () => { handleDelete( task.id, task.title ) } }><i className="fas fa-trash-alt"></i></button></td>
                                                
                                            </tr>

                                        })
                                    }
                                
                                </tbody>
        
                            </table>

                        </div>
                    
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
};

//////---------------------------------------------->>>>>


export default Layout;
