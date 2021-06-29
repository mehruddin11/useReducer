import React from 'react';

const Modal = ({modeContent, timeOutNotification}) => {
	React.useEffect(()=>{
		setTimeout(()=>{
				timeOutNotification();
		},1000)
	})
	 
	 return (
		<h4 className='modal' >{modeContent} </h4>

		)
}
export default Modal;