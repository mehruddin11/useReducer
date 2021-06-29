import React , {useState, useReducer} from 'react';
// import {data} from './data';
import Modal from './modal';
const Index = () =>{
	const [name, setName] =useState('')
	const [email, setEmail] =useState('')
	const handleSubmit = (e) => {
		e.preventDefault();
		if(name && email){
			let inputItems = {name,  id:new Date().getTime().toString()}
			dispatch({type:'ADD_ITEM', payload:inputItems})
		}
		else{
			dispatch({type:'EMPTY'})
		}
	}
	const defaultState={
		people:[],
		showModel:false,
		modeContent:'Hello'
	}
	const reducer =(state, action) => {
		if(action.type==='ADD_ITEM'){
			const newPeople = [...state.people, action.payload]
			return {
				...state,
				showModel:true,
				modeContent:'item added',
				people:newPeople
			}
		}
		if(action.type=== 'CLOSE_MODEL'){
			return {
				...state,
				showModel:false

			}
		}
		if(action.type === 'EMPTY'){
			return {
				...state, 
				showModel:true,
				modeContent:'please enter the value'
			}
		}
		if(action.type=== 'REMOVE_ITEM'){
			const filterPeople = state.people.filter((p)=>{
				return p.id !== action.payload
			})
			return {
				...state,
				people:filterPeople,
				modeContent:'Item Removed',
				showModel:true
				
			}
		}

	}
const timeOutNotification = () => {
	dispatch({type:'CLOSE_MODEL'})
}
	const [state, dispatch] =useReducer(reducer, defaultState)
	return (
		<>
		{
			state.showModel ? (<Modal 
				modeContent = {state.modeContent}
				timeOutNotification = {timeOutNotification} />):('')
		}
		<section>
			<form className ='form' onSubmit = {handleSubmit} >
			<div className='form-control'>
			<label htmlFor='firstName'>Name:</label>
			<input type ='text' id ="firstName"   name ='firstName'
			value= {name} onChange = {(e) => setName(e.target.value)} />
			</div>
			<div className='form-control'>
			<label htmlFor='Email'>Email:</label>
			<input type ='email' id ="Email" name ='Email'
			value= {email} onChange = {(e) => setEmail(e.target.value)} />
			</div>
			<div>
			<button className ='btn' type ='submit'> Submit </button>
			</div>
			</form>
		</section>
		{
			state.people.map((person)=>{
				return<div key ={person.id} className= 'item'>
				<h4> {person.name}</h4>
				<h4> {person.email} </h4>
				<button onClick = {() => dispatch({type:'REMOVE_ITEM', payload:person.id})} > remove </button>
				</div>
			})
		}
		</>
	)
}
export default Index;