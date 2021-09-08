import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadNewTask, setActiveEdit, setActiveTask } from '../Actions/taksactions';
import AddTask from './AddTask';
import EditTask from './EditTask';


//////<<<<<------------------------------------------------``

const Layout = () => 
{

    const dispatch = useDispatch();
    const { currentTasks, activeTask, activeEdit } = useSelector( state => state.tasks );
 

    //Reinicio en store de informacion activa
    useEffect(() => 
    {
        dispatch( setActiveTask( { title : "", description : "" } ) );
    
    },[dispatch]);

 
    //Activación panel edición
    const handleActivateEdit = ( id ) =>
    {
        dispatch( setActiveEdit( true ) );
        const active = currentTasks.find( ( task ) => task.id === id );
        dispatch( setActiveTask( active ) );

    };


    //Eliminacio de tarea por id
    const handleDelete = ( id, title ) =>
    {
        
        //Validacion eliminación
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


    //Ingreso nueva tarea con tecla enter
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
                            !activeEdit ?
                            
                            <AddTask currentTasks={ currentTasks } />
                            
                            :
                            
                            <EditTask currentTasks={ currentTasks} activeTask={ activeTask }  />
                           
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
                                        <th className="col">Fecha</th>
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
                                                <td>{ task.date }</td>
                                                <td><button className="btn btn-warning base__white" disabled={ activeEdit ? true : false } onClick={ () => { handleActivateEdit( task.id ) } }><i className="fas fa-edit"></i></button></td>
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
