
const saveState = ( state ) =>
{
    if( !state )
    {
        return undefined;
    };

    const data = JSON.stringify( state );

    return localStorage.setItem( "chronosState", data );
};


const loadState = () =>
{
    const data =  JSON.parse( localStorage.getItem( "chronosState" ) );

    if( !data )
    {
        return undefined;
    };

    return data;
};

//////---------------------------------------------->>>>>

export { saveState, loadState };
