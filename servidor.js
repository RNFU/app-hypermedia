const express =require ('express');
const app = express ();

app.get('/', (req, res) => {
res.send({ hi: 'hola mundo'});

});

const PORT = process.env.PORT
app.listen(PORT);



// node --v
// npm --v
// git version 2.20.1.windows.1
/*
C:\Users\tecnologia\Documents\- Mis Documentos\Code\hypermedia>heroku create
Creating app... done, ⬢ intense-sierra-29448
https://intense-sierra-29448.herokuapp.com/ | https://git.heroku.com/intense-sierra-29448.git

*/ 

//heroku open = hola mundo