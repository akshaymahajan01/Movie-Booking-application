import { Box, Button, Dialog, FormLabel, IconButton,  TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const AuthForm = ({onSubmit , isAdmin}) => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [inputs, setinputs] = useState({ name: "", email: "", password: "" })

    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }
    
    const handleSubmit = (e) =>  {
        e.preventDefault();
        onSubmit({inputs , signup : isAdmin ? false : isSignUp})
    }

    return (
        <Dialog sx={{ mt: 5 }} PaperProps={{ style: { borderRadius: 20 } }} open={true}>
            <Box sx={{ ml: 'auto', padding: 1 }}>
                <IconButton LinkComponent={Link} to='/'>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Typography variant='h4' textAlign={'center'}>
                {isSignUp ? "SignUp" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box display={'flex'} justifyContent={'center'} padding={6} flexDirection="column" width={400} margin="auto" AlignContent={"center"}>
                    {!isAdmin && isSignUp && <>
                        <FormLabel sx={{ mt: 2, mb: 1 }}>Name</FormLabel>
                        <TextField variant='standard' type={'text'} name="name"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    </>
                    }
                    <FormLabel sx={{ mt: 2, mb: 1 }}>Email</FormLabel>
                    <TextField variant='standard' type={'email'} name="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                    <FormLabel sx={{ mt: 2, mb: 1 }}>Password</FormLabel>
                    <TextField variant='standard' type={'password'} name="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                    <Button type='submit' fullWidth sx={{ mt: 3, borderRadius: 10, bgcolor: 'black', color: 'grey' }} variant='conatined' >
                         {isSignUp ? "SignUp" : "Login"}
                    </Button>
                   {!isAdmin && <Button fullWidth sx={{ mt: 3, borderRadius: 10, bgcolor: 'grey', color: 'black' }} variant='conatined'
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        Switch to {isSignUp ? "Login" : "SignUp"}
                    </Button>}
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm