import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Movieitem = ({id,title,releaseDate,posterUrl}) => {
    return (
        <Card  sx={{ width: "40vh" , height:"45vh", margin:3,borderRadius:5,":hover":{boxShadow:"10px 10px 20px #ccc",}, }}>
            <img height={"50%"} width="100%"  src={posterUrl} alt={title} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                     {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                     {new Date(releaseDate).toDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                     <Button LinkComponent={Link} to={`/booking/${id}`} fullWidth variant='contained'  sx={{margin:'auto', bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217"}}} size="small">BOOK NOW</Button>
            </CardActions> 
        </Card>
    )
}

export default Movieitem