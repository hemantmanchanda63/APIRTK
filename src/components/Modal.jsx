import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Modals({id, setshow, show}) {
    const [data, setData] = useState([])
    const {users, loading} = useSelector((state)=> state.crud)
    
    useEffect(()=>{
     if(id){
      const singleuser = users.data.filter((item)=>item.id === id)
      setData(singleuser[0])
     }
    })

    if(loading){
      return <h2>Loading...</h2>
    }

  return (
    <div>
      <Modal
        open={show}
        onClose={()=> setshow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {data.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           {data.email}<br />
           {data.age}<br />
           {data.gender}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}