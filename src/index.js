import React from 'react'
import reactDom from 'react-dom'
import '../src/Style/style.scss';
import { Chronos } from './App/Chronos';

//////<<<<<------------------------------------------------``

const rootDiv = document.getElementById("root");
reactDom.render(  <Chronos/>,rootDiv )
