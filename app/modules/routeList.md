## Rutas de Panadoc
/*********************AUTH*********************/
* POST http://localhost:3000/auth/login
Sample Request
{
		"username": "angeloacr",
		"password": "MiPanadoc47"
}

Sample Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE0ODQ0MDU2ZDcwNTA2YTE5OWRkYWQiLCJuYW1lIjoiQW5nZWxvIENyaW5jb2xpIiwidXNlcm5hbWUiOiJhbmdlbG9hY3IiLCJtYWlsIjoiYW5nZWxvY3JpbmNvbGk5MUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRuU3FHTVJ5eVJ1SEQuMXBscGo2eW5PZjNnSFlWa1lYMXhtTTJub0dUUndub0IwUC5YZDNmNiIsInR5cGUiOiJEb2N0b3IiLCJjcmVhdGVkQXQiOiIyMDE5LTEwLTE0VDE0OjIwOjQ4Ljc1OFoiLCJfX3YiOjAsImlhdCI6MTU3MTA2Mjg4NSwiZXhwIjoxNTcxNjY3Njg1fQ.QsQyTDdgNi6cOdqxNBrDefzWYE_N7eMGqi8i4iobbS4",
    "user": {
        "_id": "5da4844056d70506a199ddad",
        "name": "Angelo Crincoli",
        "username": "angeloacr",
        "mail": "angelocrincoli91@gmail.com",
        "password": "$2a$10$nSqGMRyyRuHD.1plpj6ynOf3gHYVkYX1xmM2noGTRwnoB0P.Xd3f6",
        "type": "Doctor",
        "createdAt": "2019-10-14T14:20:48.758Z",
        "__v": 0
    }
}

* POST http://localhost:3000/auth/signup
Sample Request
{
		"name": "Angelo Crincoli",
		"username": "angeloacr",
		"mail": "angelocrincoli91@gmail.com",
		"password": "MiPanadoc47",
    	"type": "Doctor"
}

Sample Response
{
    "_id": "5da4844056d70506a199ddad",
    "name": "Angelo Crincoli",
    "username": "angeloacr",
    "mail": "angelocrincoli91@gmail.com",
    "password": "$2a$10$nSqGMRyyRuHD.1plpj6ynOf3gHYVkYX1xmM2noGTRwnoB0P.Xd3f6",
    "type": "Doctor",
    "createdAt": "2019-10-14T14:20:48.758Z",
    "__v": 0
}

/*********************USER*********************/
* PUT http://localhost:3000/user/
Sample Request
{
      "id": "5da4844056d70506a199ddad",
      "name": "Angelo A. Crincoli R.",
      "avatarSrc": "assets/angelopic",
      "phone": "+584148583697"
}

Sample Response
{
    "_id": "5da4844056d70506a199ddad",
    "name": "Angelo A. Crincoli R.",
    "username": "angeloacr",
    "mail": "angelocrincoli91@gmail.com",
    "password": "$2a$10$nSqGMRyyRuHD.1plpj6ynOf3gHYVkYX1xmM2noGTRwnoB0P.Xd3f6",
    "type": "Doctor",
    "createdAt": "2019-10-14T14:20:48.758Z",
    "__v": 0,
    "avatarSrc": "assets/angelopic",
    "phone": "+584148583697"
}

* DELETE http://localhost:3000/user/:userId
Sample Request
{
}

Sample Response
{
}

* GET http://localhost:3000/user/:userId
Sample Request
http://{{url}}/user/5da4844056d70506a199ddad

Sample Response
{
    "_id": "5da4844056d70506a199ddad",
    "name": "Angelo Crincoli",
    "username": "angeloacr",
    "mail": "angelocrincoli91@gmail.com",
    "password": "$2a$10$nSqGMRyyRuHD.1plpj6ynOf3gHYVkYX1xmM2noGTRwnoB0P.Xd3f6",
    "type": "Doctor",
    "createdAt": "2019-10-14T14:20:48.758Z",
    "__v": 0
}

/*********************ASKADOC*********************/
* POST http://localhost:3000/askadoc/
Sample Request
{
    askerId: 'a45sf653asdf', //Aplica solo si es usuario registrado quien pregunta
    title: 'Que sera de mi sin ti?',
    details: 'Podre seguir?'
}

Sample Response
{
}

* PUT http://localhost:3000/askadoc/:questionId
Sample Request
{
    doctorId: '5a4sd564asd',
    text: 'Esta es la respuesta'
}

Sample Response
{
}

* GET http://localhost:3000/askadoc/unanswered
Sample Response
{
}

* GET http://localhost:3000/askadoc/answered
Sample Response
{
}

* GET http://localhost:3000/askadoc/answered/:doctorId
Sample Response
{
}

* DELETE http://localhost:3000/askadoc/answer/:answerId
Sample Request
{
}

Sample Response
{
}

* GET http://localhost:3000/askadoc/question/:questionId
Sample Response
{
}

/*********************MGUIDE*********************/
* GET http://localhost:3000/mguide/symptoms 
Sample Response
{
}

* POST http://localhost:3000/mguide/symptoms 
Sample Request
{
}

Sample Response
{
}

* POST http://localhost:3000/mguide/doctor
Sample Request
{
	"userId": "5da4844056d70506a199ddad",
	"speciality": "Cardiologia",
	"summary": "Me gusta curar corazones rotos",
	"experience": "5 anos",
	"addr": "Av. Las Americas"
}

Sample Response
{
    "reviewsId": [],
    "appointmentsId": [],
    "questionsId": [],
    "mhsId": [],
    "_id": "5da489abd9d3a414e67fff49",
    "userId": "5da4844056d70506a199ddad",
    "speciality": "Cardiologia",
    "summary": "Me gusta curar corazones rotos",
    "experience": "5 anos",
    "addr": "Av. Las Americas",
    "__v": 0
}

* POST http://localhost:3000/mguide/patient
Sample Request
{
      userId: 'as4d43351ad3s53a'
}

Sample Response
{
}

* GET http://localhost:3000/mguide/doctors/
Sample Response
{
}

* GET http://localhost:3000/mguide/patients/
Sample Response
{
}

* GET http://localhost:3000/mguide/doctor/:doctorId
http://{{url}}/mguide/doctor/5da489abd9d3a414e67fff49

Sample Response
{
    "reviewsId": [],
    "appointmentsId": [],
    "questionsId": [],
    "mhsId": [],
    "_id": "5da489abd9d3a414e67fff49",
    "userId": "5da4844056d70506a199ddad",
    "speciality": "Cardiologia",
    "summary": "Me gusta curar corazones rotos",
    "experience": "5 anos",
    "addr": "Av. Las Americas",
    "__v": 0
}

* GET http://localhost:3000/mguide/patient/:patientId
Sample Response
{
}

* POST http://localhost:3000/mguide/appointment
Sample Request
{
      patientId: 'as4d6a54sd65asd',
      doctorId: 'a54sda5s4dd6a4sd',
      initDate: '', 
      finishDate: '' 
}

Sample Response
{
}

* GET http://localhost:3000/mguide/appointment/:appointmentId
Sample Response
{
}

* GET http://localhost:3000/mguide/dAppointments/:doctorId
Sample Response
{
}

* GET http://localhost:3000/mguide/pAppointments/:patientId
Sample Response
{
}

* PUT http://localhost:3000/mguide/appointment/:appointmentId
Sample Request
{
}

Sample Response
{
}

* DELETE http://localhost:3000/mguide/appointment/:appointmentId
Sample Request
{
}

Sample Response
{
}

* POST http://localhost:3000/mguide/review/ ~
Sample Request
{
}

Sample Response
{
}


## TODO: Historial Clinico



